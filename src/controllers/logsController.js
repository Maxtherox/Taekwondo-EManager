const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare} = require('bcryptjs');

class LogsController {
    async create(request, response){
        console.log("teste funcional rota chamada com sucesso.")
        return response.status(201).json();
    }
    async update(request, response){

        return response.status(201).json();
    }
    async show(request, response){

        return response.status(201).json();
    }
    async delete(request, response){

        return response.status(201).json();
    }
    async index(request, response){

        return response.status(201).json();
    }
}

module.exports = LogsController;