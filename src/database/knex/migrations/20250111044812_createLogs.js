exports.up = knex => knex.schema.createTable("logs", table => {
    table.increments('id').primary(); // ID do log (chave primária)
    table.string('table').notNullable(); // Nome da tabela alterada ('alunos', 'campeonatos', etc.)
    table.integer('register_id').unsigned().notNullable(); // ID do registro alterado (ex.: aluno_id, campeonato_id)
    table.integer('user_id').unsigned().notNullable() // Quem fez a alteração (geralmente professor)
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('description').notNullable(); // Descrição da alteração
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Data e hora da alteração
});

exports.down = knex => knex.schema.dropTable("logs");