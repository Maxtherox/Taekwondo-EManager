exports.up = knex => knex.schema.createTable("logs", table => {
    table.increments('id').primary(); // ID do log (chave prim�ria)
    table.string('table').notNullable(); // Nome da tabela alterada ('alunos', 'campeonatos', etc.)
    table.integer('register_id').unsigned().notNullable(); // ID do registro alterado (ex.: aluno_id, campeonato_id)
    table.integer('user_id').unsigned().notNullable() // Quem fez a altera��o (geralmente professor)
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('description').notNullable(); // Descri��o da altera��o
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Data e hora da altera��o
});

exports.down = knex => knex.schema.dropTable("logs");