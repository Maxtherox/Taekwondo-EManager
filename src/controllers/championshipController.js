const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare} = require('bcryptjs');

class ChampionshipsController {
    async create(request, response){
        const {role} = request.user

        if (role !== "admin") {
            throw new AppError("Permissão negada: Apenas administradores podem criar campeonatos", 403);
        }

        const {name, location, date} = request.body
        const user_id = request.user.id;

        await knex('championships').insert({name: name, location: location, date: date, user_id: user_id})


        console.log(`Id do usuário é ${request.user.id}`)
        
        return response.status(201).json();
    }
    async update(request, response){

        
        return response.status(201).json();
    }
    async show(request, response){

        const { id } = request.params; // ID do campeonato

        try {
            // Buscando informações do campeonato e número de inscritos
            const championshipDetails = await knex("championships")
                .leftJoin("subscriptions", "championships.id", "subscriptions.championship_id")
                .select(
                    "championships.id",
                    "championships.name",
                    "championships.location",
                    "championships.date",
                    knex.raw("COUNT(subscriptions.id) as total_subscriptions")
                )
                .where("championships.id", id)
                .groupBy(
                    "championships.id",
                    "championships.name",
                    "championships.location",
                    "championships.date"
                )
                .first();
    
            if (!championshipDetails) {
                return response.status(404).json({ message: "Championship not found" });
            }
    
            // Buscando faixas dos inscritos no campeonato
            const competitorDetails = await knex("subscriptions")
                .join("competitors", "subscriptions.competitor_id", "=", "competitors.id")
                .select(
                    "competitors.name",
                    "competitors.belt",
                    "competitors.birth_date",
                    "competitors.weight",
                    "competitors.belt_category",
                    "competitors.gender"
                )
                .where("subscriptions.championship_id", id);
    
            // Retornando os dados combinados
            return response.status(200).json({
                championship: championshipDetails,
                competitors: competitorDetails,
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Internal Server Error" });
        }
    }
    async delete(request, response){
        const {id} = request.params

        await knex("championships").where({id}).delete();
        return response.status(201).json();
    }
    async index(request, response){
        try {
            const championships = await knex("championships")
                .leftJoin("subscriptions", "championships.id", "subscriptions.championship_id")
                .leftJoin("competitors", "subscriptions.competitor_id", "competitors.id")
                .select(
                    "championships.id",
                    "championships.name",
                    "championships.location",
                    "championships.date",
                    knex.raw("COUNT(subscriptions.id) as total_subscriptions"),
                    knex.raw("GROUP_CONCAT(DISTINCT competitors.name) as competitors_names"),
                    knex.raw("GROUP_CONCAT(DISTINCT competitors.belt) as belts")
                )
                .groupBy(
                    "championships.id",
                    "championships.name",
                    "championships.location",
                    "championships.date"
                );
    
            return response.status(200).json(championships);
        } catch (error) {
            console.error("Error fetching championships:", error);
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = ChampionshipsController;