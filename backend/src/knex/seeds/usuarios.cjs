const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  await knex("usuarios").del();

  // Gera hashes para as senhas
  const senhas = await Promise.all([
    bcrypt.hash("123", 10),
    bcrypt.hash("456", 10),
    bcrypt.hash("789", 10),
    bcrypt.hash("abc", 10),
    bcrypt.hash("def", 10),
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
