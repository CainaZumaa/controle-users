export class Usuario {
  constructor({ id, nome, email, senha }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static validate(dados) {
    if (!dados.nome || !dados.email) {
      throw new Error("Nome, email e senha são obrigatórios");
    }
  }
}
