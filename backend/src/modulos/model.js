export class Modulo {
  constructor({ id, nome, descricao }) {
    this.id = id;
    this.nome = nome;
    this.senha = descricao;
  }

  static validate(dados) {
    if (!dados.nome || !dados.descricao) {
      throw new Error("Nome e descrição são obrigatórios");
    }
  }
}