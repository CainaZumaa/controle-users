export class AuditoriaLog {
  constructor({
    usuario_email,
    acao,
    tabela_afetada,
    dados_anteriores = null,
    dados_novos = null,
    user_agent = null,
    created_at = null
  }) {
    this.usuario_email = usuario_email;
    this.acao = acao;
    this.tabela_afetada = tabela_afetada;
    this.dados_anteriores = dados_anteriores;
    this.dados_novos = dados_novos;
    this.user_agent = user_agent;
    this.created_at = created_at;
  }

  toDatabase() {
    return {
      usuario_email: this.usuario_email,
      acao: this.acao,
      tabela_afetada: this.tabela_afetada,
      dados_anteriores: this.dados_anteriores ? JSON.stringify(this.dados_anteriores) : null,
      dados_novos: this.dados_novos ? JSON.stringify(this.dados_novos) : null,
      user_agent: this.user_agent,
      created_at: this.created_at || new Date().toISOString()
    };
  }

  static fromDatabase(data) {
    return new AuditoriaLog({
      ...data,
      dados_anteriores: data.dados_anteriores ? JSON.parse(data.dados_anteriores) : null,
      dados_novos: data.dados_novos ? JSON.parse(data.dados_novos) : null
    });
  }
}
