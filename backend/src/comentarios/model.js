export class Comentario {
  constructor({
    id,
    usuario_email,
    conteudo,
    tipo,
    status = "ativo",
    created_at = null,
    updated_at = null,
  }) {
    this.id = id;
    this.usuario_email = usuario_email;
    this.conteudo = conteudo;
    this.tipo = tipo;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static validate(dados) {
    if (!dados.usuario_email || !dados.conteudo || !dados.tipo) {
      throw new Error("Email do usuário, conteúdo e tipo são obrigatórios");
    }
  }

  toDatabase() {
    return {
      id: this.id,
      usuario_email: this.usuario_email,
      conteudo: this.conteudo,
      tipo: this.tipo,
      status: this.status,
      created_at: this.created_at || new Date().toISOString(),
      updated_at: this.updated_at,
    };
  }

  static fromDatabase(data) {
    if (!data) return null;
    return new Comentario(data);
  }
}
