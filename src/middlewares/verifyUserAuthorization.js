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
