// Importa o arquivo de configuraÃ§Ã£o do Knex. O caminho Ã© relativo ao local deste arquivo.
const config = require('../../../knexfile');

// Importa o mÃ³dulo 'knex', que Ã© uma biblioteca SQL query builder para Node.js.
const knex = require("knex");

// Cria uma conexÃ£o usando a configuraÃ§Ã£o especÃ­fica para o ambiente de desenvolvimento.
const connection = knex(config.development);

// Exporta a conexÃ£o para ser usada em outros mÃ³dulos.
module.exports = connection;