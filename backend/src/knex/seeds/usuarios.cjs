exports.seed = async function (knex) {
  await knex("usuarios").del();

  await knex("usuarios").insert([
    { nome: "Cainã", email: "caina@example.com" },
    { nome: "Calebe", email: "calebe@example.com" },
    { nome: "Adilson", email: "adilson@example.com" },
    { nome: "Philippe", email: "philippe@example.com" },
    { nome: "Diego", email: "diego@example.com" },
  ]);
};
