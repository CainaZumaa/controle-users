export class Permissoes {
  constructor({ id, nome}) {
    this.id = id;
    this.nome = nome;
  }

  static validate(dados) {
    if (!dados.nome) {
      throw new Error("Nome e descrição são obrigatórios");
    }
  }
}
