/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('amigos').del()
  await knex('amigos').insert([
    { nome: "Elson José", idade: 14, sexo: "M"},
    { nome: "Miguel Meneguelo", idade: 14, sexo: "M"},
    { nome: "Ana", idade: 14, sexo: "F"}
  ]);
};
