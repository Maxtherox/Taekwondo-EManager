const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare} = require('bcryptjs');
const {calculateAge} = require('../utils/calcAge')

class UsersController {
    async create(request, response){
        const {name, email, password, birth_date, belt} = request.body
        console.log("Senha recebida:", password);
        console.log(request.body)
        const  hashedPassword = await hash(password, 8);
        await knex("users").insert({name: name, email: email, password: hashedPassword, birth_date: birth_date, belt: belt});
   
         return response.status(201).json()
    }
    async index(request, response){
        //const {name, email, password, birth_date, belt} = request.body

        const users = await knex("users").select('name', 'email', 'birth_date', 'belt')
       
        return response.status(200).json(users)
    }
    async update(request, response){
        const {name, email, password, old_password} = request.body;
        const user_id = request.user.id
        
        const user = await knex("users").where('id', user_id).first();
        
        if(!user){
            throw new AppError("Usuário não encontrado.");
        }

        const userWithUpdatedEmail = await knex("users").where({email})

        if (userWithUpdatedEmail.email && userWithUpdatedEmail.id !== user.id){
            throw new AppError("E-mail já em uso.")
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;


        if(password && !old_password){
            throw new AppError("É necessário informar sua senha antiga para prosseguir.");
        }

        if(password && old_password){

            const checkOldPassword = await compare(old_password, user.password);


 
            
            if(!checkOldPassword){
                throw new AppError("Senha anterior incorreta.")
            }
            user.password = await hash(password, 8)
        }

        await knex("users")
            .update({name: user.name, email: user.email, password: user.password})
            .where('id', user_id)


        return response.status(201).json()
    }
}

module.exports = UsersController;