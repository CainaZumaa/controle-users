export class Modulo {
  constructor({ id, nome, descricao }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }

  static validate(dados) {
    if (!dados.nome) {
      throw new Error("Nome e descrição são obrigatórios");
    }
  }
}
