export class Permissoes {
  constructor({ id, nome, criado_em, inserir, editar,deletar,ler}) {
    this.id = id;
    this.nome = nome;
    this.criado_em = criado_em;
    this.inserir = inserir;
    this.editar = editar;
    this.deletar = deletar;
    this.ler = ler;
  }

  static validate(dados) {
    if (!dados.nome) {
      throw new Error("Nome e descrição são obrigatórios");
    }
  }
}
