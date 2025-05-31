export class Perfil {
  constructor({ id, nome, descricao }) {
    this.id = id;
    this.nome = nome;
    this.descricao=descricao;
  }

  static validate(perfil) {
    if (!perfil.nome || !perfil.descricao) {
      throw new Error("Nome e descricao são obrigatórios");
    }
  }
}