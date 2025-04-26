// YYYYMMDDHHMMSS_alter_users_change_age_to_birth_date.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // 1. Adicionar a nova coluna birth_date
    await knex.schema.alterTable('users', (table) => {
      table.date('birth_date').nullable(); // Adiciona como nullável inicialmente
    });
  
    // 2. Preencher a nova coluna com a data fictícia para registros existentes
    //    (O SQLite não tem um tipo DATE nativo real, mas armazena como TEXT ou NUMERIC.
    //     Usar o formato 'YYYY-MM-DD' é o padrão.)
    await knex('users').update({ birth_date: '1999-01-06' });
  
    // 3. (Opcional, mas recomendado) Tornar a coluna NOT NULL se apropriado
    //    Se todos os usuários DEVEM ter uma data de nascimento.
     await knex.schema.alterTable('users', (table) => {
       table.date('birth_date').notNullable().alter();
     });
  
    // 4. Remover a coluna antiga 'age'
    //    ATENÇÃO: Isso remove permanentemente os dados da coluna 'age'.
    //    Certifique-se de que fez backup e que os dados foram migrados/substituídos corretamente.
    await knex.schema.alterTable('users', (table) => {
      table.dropColumn('age');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    // Reverte as alterações:
    // 1. Adiciona a coluna 'age' de volta (como INTEGER, assumindo que era assim antes)
    await knex.schema.alterTable('users', (table) => {
      table.integer('age').nullable(); // Pode precisar ajustar o tipo se era diferente
    });
  
    // 2. (Opcional) Tentar popular 'age' de volta a partir de 'birth_date' se possível/necessário.
    //    Isso é complexo e depende de como você calcularia a idade a partir de '1999-01-06'.
    //    Para simplificar, podemos apenas deixá-la null ou com um valor padrão.
    //    Exemplo: await knex('users').update({ age: 26 }); // Atualiza para uma idade fixa
  
    // 3. Remover a coluna 'birth_date'
    await knex.schema.alterTable('users', (table) => {
      table.dropColumn('birth_date');
    });
  };