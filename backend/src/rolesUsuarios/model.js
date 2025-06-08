export class rolesUsuarios {
  constructor({ id_role, id_usuario}) {
    this.id_role = id_role;
    this.id_usuario = id_usuario;
  }

  static validate(dados) {
    if (!dados.id_role || !dados.id_usuario) {
      throw new Error("Campos são obrigatórios");
    }
  }
}
