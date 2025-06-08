export class Usuario {
  constructor({ id, nome, email, senha, is_active, last_login }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.is_active = is_active ?? true;
    this.last_login = last_login;
  }

  static validate(dados) {
    if (!dados.nome || !dados.email || !dados.senha) {
      throw new Error("Nome, email e senha são obrigatórios");
    }
  }
}
