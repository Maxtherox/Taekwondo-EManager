// YYYYMMDDHHMMSS_alter_competitors_change_age_to_birth_date.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // 1. Adicionar a nova coluna birth_date
    await knex.schema.alterTable('competitors', (table) => {
      table.date('birth_date').nullable(); // Adiciona como nullável inicialmente
    });
  
    // 2. Preencher a nova coluna com a data fictícia para registros existentes
    //    Use o formato 'YYYY-MM-DD' para consistência.
    await knex('competitors').update({ birth_date: '1999-01-06' });
  
    // 3. (Opcional, mas recomendado) Tornar a coluna NOT NULL se apropriado
    //    Se todos os competidores DEVEM ter uma data de nascimento.
     await knex.schema.alterTable('competitors', (table) => {
       table.date('birth_date').notNullable().alter();
    });
    //    Nota: .alter() para mudar nulidade pode requerer knex.raw() em SQLite.
  
    // 4. Remover a coluna antiga 'age'
    //    ATENÇÃO: Faça backup antes!
    await knex.schema.alterTable('competitors', (table) => {
      table.dropColumn('age');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    // Reverte as alterações:
    // 1. Adiciona a coluna 'age' de volta (como INTEGER)
    await knex.schema.alterTable('competitors', (table) => {
      table.integer('age').nullable(); // Ou o tipo original que você tinha
    });
  
    // 2. (Opcional) Tentar popular 'age' de volta.
    //    Como usamos data fictícia, não podemos recuperar a idade original.
    //    Pode deixar NULL ou definir um valor padrão se necessário.
    //    Exemplo: await knex('competitors').update({ age: 26 });
  
    // 3. Remover a coluna 'birth_date'
    await knex.schema.alterTable('competitors', (table) => {
      table.dropColumn('birth_date');
    });
  };