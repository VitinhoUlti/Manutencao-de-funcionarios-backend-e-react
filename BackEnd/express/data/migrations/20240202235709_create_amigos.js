/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("amigos", (table) => {
    table.increments();
    table.string("nome", 200).notNullable();
    table.integer("idade", 3).notNullable();
    table.string("sexo", 1).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("amigos");
};
