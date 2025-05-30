export class Roles {
    constructor({ id, nome, admin, editor, leitor}) {
    this.id = id;
    this.nome = nome;
    this.admin = admin;
    this.editor = editor;
    this.leitor = leitor;
  }

  static validate(dados) {
    if (!dados.nome) {
      throw new Error("Campos são obrigatórios");
    }
  }
}
