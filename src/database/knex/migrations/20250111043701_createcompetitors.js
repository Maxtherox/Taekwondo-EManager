exports.up = knex => knex.schema.createTable("competitors", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("age").notNullable();
    table.enu('gender', ['masculino', 'feminino'], { useNative: true, enumName: 'gender' }).notNullable();
    table.text("belt").notNullable();
    table.integer("weight").notNullable();
    table.integer("user_id").notNullable()
         .unsigned()
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
    table.text('belt_category')
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("competitors");