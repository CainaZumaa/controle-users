import db from "../../db.js";

export class AuditoriaRepository {
  async create(auditoriaData) {
    try {
      const dadosFormatados = {
        ...auditoriaData,
        dados_anteriores: auditoriaData.dados_anteriores ? JSON.stringify(auditoriaData.dados_anteriores) : null,
        dados_novos: auditoriaData.dados_novos ? JSON.stringify(auditoriaData.dados_novos) : null,
        created_at: new Date().toISOString()
      };

      const [log] = await db("auditoria_logs")
        .insert(dadosFormatados)
        .returning("*");
      
      return log;
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters = {}) {
    let query = db("auditoria_logs")
      .leftJoin("usuarios", "auditoria_logs.usuario_email", "usuarios.email")
      .select("auditoria_logs.*", "usuarios.nome as usuario_nome")
      .orderBy("auditoria_logs.created_at", "desc");

    // Aplicar filtros
    if (filters.usuario_email) {
      query = query.where(
        "auditoria_logs.usuario_email",
        filters.usuario_email
      );
    }

    if (filters.tabela_afetada) {
      query = query.where(
        "auditoria_logs.tabela_afetada",
        filters.tabela_afetada
      );
    }

    if (filters.acao) {
      query = query.where("auditoria_logs.acao", filters.acao);
    }

    if (filters.data_inicio) {
      query = query.where(
        "auditoria_logs.created_at",
        ">=",
        filters.data_inicio
      );
    }

    if (filters.data_fim) {
      query = query.where("auditoria_logs.created_at", "<=", filters.data_fim);
    }

    // Paginação
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async findById(id) {
    const log = await db("auditoria_logs")
      .leftJoin("usuarios", "auditoria_logs.usuario_email", "usuarios.email")
      .select("auditoria_logs.*", "usuarios.nome as usuario_nome")
      .where("auditoria_logs.id", id)
      .first();

    return log;
  }

  async findByUsuario(usuario_email, limit = 50) {
    return await db("auditoria_logs")
      .where("usuario_email", usuario_email)
      .orderBy("created_at", "desc")
      .limit(limit);
  }

  async getAcoesDisponiveis() {
    const acoes = await db("auditoria_logs")
      .distinct("acao")
      .select("acao")
      .orderBy("acao");

    return acoes.map((row) => row.acao);
  }

  async getTabelasAfetadas() {
    const tabelas = await db("auditoria_logs")
      .distinct("tabela_afetada")
      .select("tabela_afetada")
      .orderBy("tabela_afetada");

    return tabelas.map((row) => row.tabela_afetada);
  }

  async deleteOldLogs(diasAnteriores = 90) {
    const dataCorte = new Date();
    dataCorte.setDate(dataCorte.getDate() - diasAnteriores);

    const deletedCount = await db("auditoria_logs")
      .where("created_at", "<", dataCorte)
      .del();

    return deletedCount;
  }

  async getEstatisticas(filtros = {}) {
    let query = db("auditoria_logs");

    if (filtros.data_inicio) {
      query = query.where("created_at", ">=", filtros.data_inicio);
    }

    if (filtros.data_fim) {
      query = query.where("created_at", "<=", filtros.data_fim);
    }

    const stats = await query
      .select(
        db.raw("COUNT(*) as total_logs"),
        db.raw("COUNT(DISTINCT usuario_email) as usuarios_unicos"),
        db.raw("COUNT(DISTINCT tabela_afetada) as tabelas_afetadas")
      )
      .first();

    const acoesStats = await query
      .clone()
      .select("acao")
      .count("* as quantidade")
      .groupBy("acao")
      .orderBy("quantidade", "desc");

    const tabelasStats = await query
      .clone()
      .select("tabela_afetada")
      .count("* as quantidade")
      .groupBy("tabela_afetada")
      .orderBy("quantidade", "desc");

    return {
      ...stats,
      acoes_mais_frequentes: acoesStats,
      tabelas_mais_afetadas: tabelasStats,
    };
  }
}
