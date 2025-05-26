const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  await knex("usuarios").del();

  // Gera hashes para as senhas
  const senhas = await Promise.all([
    bcrypt.hash("123", 8),
    bcrypt.hash("456", 8),
    bcrypt.hash("789", 8),
    bcrypt.hash("abc", 8),
    bcrypt.hash("def", 8),
  ]);

  await knex("usuarios").insert([
    {
      nome: "Cainã",
      email: "caina@example.com",
      senha: senhas[0],
    },
    {
      nome: "Calebe",
      email: "calebe@example.com",
      senha: senhas[1],
    },
    {
      nome: "Adilson",
      email: "adilson@example.com",
      senha: senhas[2],
    },
    {
      nome: "Philippe",
      email: "philippe@example.com",
      senha: senhas[3],
    },
    {
      nome: "Diego",
      email: "diego@example.com",
      senha: senhas[4],
    },
  ]);
};
