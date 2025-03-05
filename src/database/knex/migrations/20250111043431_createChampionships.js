exports.up = knex => knex.schema.createTable("championships", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.date("date").notNullable();
    table.integer("user_id").notNullable()
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
        
    table.boolean("status").notNullable().defaultTo(true)

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("championships");