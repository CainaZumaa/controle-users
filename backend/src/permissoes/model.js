export class Permissoes {
  constructor({ id, user_email, tipo_permissao }) {
    this.id = id;
    this.user_email = user_email;
    this.tipo_permissao = tipo_permissao;
  }

  static validate(dados) {
    if (!dados.user_email) {
      throw new Error("O e-mail do usuário é obrigatório.");
    }

    if (!dados.tipo_permissao) {
      throw new Error("O tipo de permissão é obrigatório.");
    }
  }
}
