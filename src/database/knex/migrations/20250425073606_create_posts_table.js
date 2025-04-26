// YYYYMMDDHHMMSS_create_posts_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("posts", table => {
      table.increments("id").primary();
      table.text("title").notNullable();
      // Usamos TEXT para armazenar HTML, que pode ser longo
      table.text("content").notNullable();
      // Chave estrangeira para o usuário que criou o post (admin)
      table.integer("user_id")
           .references("id")
           .inTable("users")
           .onDelete("SET NULL"); // Ou CASCADE se preferir deletar posts quando o user for deletado
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("posts");
  };