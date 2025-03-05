const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare} = require('bcryptjs');

class SubscriptionsController {
    async create(request, response){
        const {role} = request.user

        if (role !== "admin") {
            throw new AppError("Permissão negada: Apenas administradores podem registrar participantes!", 403);
        }

        const {competitor_id, championship_id} = request.body
        const user_id = request.user.id;

        await knex('subscriptions').insert({competitor_id: competitor_id, championship_id: championship_id, user_id: user_id})


        console.log(`Id do usuário é ${request.user.id}`)
        
        return response.status(201).json();
    }
    async update(request, response){

        return response.status(201).json();
    }
    async show(request, response){

        return response.status(201).json();
    }
    async delete(request, response){
        const {id} = request.params

        await knex("subscriptions").where({id}).delete();

        return response.status(201).json();
    }
    async index(request, response){

        return response.status(201).json();
    }
}

module.exports = SubscriptionsController;