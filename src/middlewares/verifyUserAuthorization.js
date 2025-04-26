// src/middlewares/verifyUserAuthorization.js (Sugestão Corrigida)
const AppError = require("../utils/AppError");

function verifyUserAuthorization(roleToVerify) {
    return (request, response, next) => {
        // Assume que ensureAuthenticated já executou e populou request.user
        const { role } = request.user; // Acessa a role já validada

        if (!role) {
            // Se por algum motivo a role não estiver presente (inesperado se ensureAuthenticated rodou)
            throw new AppError("User role not found after authentication", 401);
        }

        console.log({ role }); // Log da role

        // Verifica se a role do usuário está na lista de roles permitidas
        if (!roleToVerify.includes(role)) {
            throw new AppError("Unauthorized", 401); // Ou 403 Forbidden
        }

        return next(); // Permissão concedida, continua para o próximo middleware/controller
    };
}

module.exports = verifyUserAuthorization;
/*

// antiga versão
const jwt = require('jsonwebtoken');
const AppError = require("../utils/AppError");

function verifyUserAuthorization(roleToVerify) {
    return (request, response, next) => {
        try {
            // Captura o token do cookie
            const token = request.cookies.token; // Assumindo que o cookie do token se chama 'token'

            if (!token) {
                throw new AppError("Token not found", 401);
            }

            // Verifica e decodifica o token (utilize a chave secreta correta)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Coloca as informações do usuário no request para ser usado nos próximos middlewares
            request.user = decoded;

            const { role } = request.user;

            console.log({ role });

            // Verifica se o papel do usuário está autorizado
            if (!roleToVerify.includes(role)) {
                throw new AppError("Unauthorized", 401);
            }

            return next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = verifyUserAuthorization;
*/