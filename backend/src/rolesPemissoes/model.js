export class rolesPermissoes {
  constructor({ id_role, id_permissao}) {
    this.id_role = id_role;
    this.id_permissao = id_permissao;
  }

  static validate(dados) {
    if (!dados.id_role || !dados.id_permissao) {
      throw new Error("Campos são obrigatórios");
    }
  }
}
