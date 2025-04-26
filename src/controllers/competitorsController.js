const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');
const getBeltCategory = require('../utils/beltCategory');
const {calculateAge} = require('../utils/calcAge')

class CompetitorsController {
    async create(request, response) {
        const { role } = request.user;

        if (role !== "admin") {
            throw new AppError("Permissão negada: Apenas administradores podem criar participantes", 403);
        }

        const { name, birth_date, belt, weight, gender } = request.body;
        const user_id = request.user.id;

        // Importa a função getBeltCategory


        // Determina a categoria de faixa
        const beltCategory = getBeltCategory(belt);

        if (!beltCategory) {
            throw new AppError("Faixa inválida. A faixa não corresponde a nenhuma categoria conhecida.", 400);
        }

        // Inserção dos dados com a categoria de faixa
        await knex('competitors').insert({
            name: name,
            birth_date: birth_date,
            belt: belt,
            belt_category: beltCategory, // Adiciona a categoria de faixa
            weight: weight,
            gender: gender,
            user_id: user_id
        });

        return response.status(201).json();
    }
    async update(request, response) {

        return response.status(201).json();
    }
    async show(request, response) {
        const { id } = request.params;

        try {
            const competitorData  = await knex("competitors")
                .join("users", "competitors.user_id", "=", "users.id")
                .select(
                    "competitors.id",
                    "competitors.name",
                    "competitors.birth_date",
                    "competitors.belt",
                    "competitors.weight",
                    "competitors.user_id",
                    "users.name as created_by"
                )
                .where("competitors.id", id) // Especifique a tabela para evitar ambiguidades
                .first();

            if (!competitorData) {
                return response.status(404).json({ message: "Competidor não existe" });
            }
            // Adiciona a idade calculada ao objeto antes de retornar
            const resultWithAge = {
                ...competitorData,
                age: calculateAge(competitorData.birth_date) // <<< Calcula e adiciona 'age'
            };

            return response.status(200).json(resultWithAge);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro interno do servidor!" });
        }
    }
    async delete(request, response) {
        const { id } = request.params

        await knex("competitors").where({ id }).delete();
        return response.status(201).json();
    }
    async index(request, response) {
        const competitorsData = await knex("competitors")
            .join("users", "competitors.user_id", "users.id")
            .select(
                "competitors.id",
                "competitors.name",
                "competitors.birth_date",
                "competitors.belt",
                "competitors.belt_category",
                "competitors.gender",
                "competitors.weight",
                "competitors.user_id",
                "users.name as created_by"
            )

        // Mapeia os resultados para adicionar a propriedade 'age' calculada
        const resultsWithAge = competitorsData.map(competitor => ({
            ...competitor, // Mantém todas as outras propriedades
            age: calculateAge(competitor.birth_date) // <<< Calcula e adiciona 'age'
        }));
        return response.status(201).json(resultsWithAge);
    }
}

module.exports = CompetitorsController;