exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.date("birth_date");
    table.text("belt");
    table.enu('role', ['admin', 'customer', 'sale'], { useNative: true, enumName: 'role' }).notNullable().defaultTo('customer');
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("users");