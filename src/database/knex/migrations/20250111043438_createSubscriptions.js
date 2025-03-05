exports.up = knex => knex.schema.createTable("subscriptions", table => {
    table.increments("id").primary();
    table.integer("competitor_id").unsigned().notNullable()
    .references('id').inTable('competitors').onDelete('CASCADE')
    table.integer("user_id").notNullable()
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
    table.integer('championship_id').unsigned().notNullable()
    .references('id').inTable('championships').onDelete('CASCADE')
    table.boolean('status').defaultTo(false)
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("subscriptions");