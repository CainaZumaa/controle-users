export class Permissoes {
  constructor({ id, nome, descricao }) {
    this.id = id;
    this.nome = nome;
    this.criado_em = new Date();
    this.inserir = false;
    this.editar = false;
    this.deletar = false;
    this.ler = true
  }

  static validate(dados) {
    if (!dados.nome) {
      throw new Error("Nome e descrição são obrigatórios");
    }
  }
}
