export class Roles {
    constructor({ id, nome}) {
    this.id = id;
    this.nome = nome;   
  }

  static validate(dados) {
    if (!dados.nome) {
      throw new Error("Campos são obrigatórios");
    }
  }
}
