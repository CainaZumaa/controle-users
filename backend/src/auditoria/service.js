import { AuditoriaRepository } from "./repository.js";
import { AuditoriaLog } from "./model.js";

export class AuditoriaService {
  constructor() {
    this.repository = new AuditoriaRepository();
  }

  // Método principal para criar logs de auditoria
  async criarLog({
    usuario_email,
    acao,
    tabela_afetada,
    dados_anteriores = null,
    dados_novos = null,
    user_agent = null,
  }) {
    try {
      const log = new AuditoriaLog({
        usuario_email,
        acao,
        tabela_afetada,
        dados_anteriores,
        dados_novos,
        user_agent,
      });

      return await this.repository.create(log.toDatabase());
    } catch (error) {
      throw error;
    }
  }

  async listarLogs(filtros = {}, page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const logs = await this.repository.findAll({
      ...filtros,
      limit,
      offset,
    });

    return {
      logs,
      pagination: {
        page,
        limit,
        hasMore: logs.length === limit,
      },
    };
  }

  async buscarLogPorId(id) {
    const log = await this.repository.findById(id);

    if (!log) {
      throw new Error("Log de auditoria não encontrado");
    }

    return log;
  }

  async buscarLogsPorUsuario(usuario_email, limit = 50) {
    return await this.repository.findByUsuario(usuario_email, limit);
  }

  async obterAcoesDisponiveis() {
    return await this.repository.getAcoesDisponiveis();
  }

  async obterTabelasAfetadas() {
    return await this.repository.getTabelasAfetadas();
  }

  async limparLogsAntigos(diasAnteriores = 90) {
    const deletedCount = await this.repository.deleteOldLogs(diasAnteriores);

    return {
      message: `${deletedCount} logs removidos com sucesso`,
      deletedCount,
    };
  }

  async obterEstatisticas(filtros = {}) {
    return await this.repository.getEstatisticas(filtros);
  }

  // Métodos para diferentes tipos de ação
  async logCriacao(tabela, dados_novos, usuario_email, req) {
    return await this.criarLog({
      usuario_email,
      acao: "CREATE",
      tabela_afetada: tabela,
      dados_anteriores: null,
      dados_novos,
      user_agent: req.headers["user-agent"] || null,
    });
  }

  async logAtualizacao(
    tabela,

    dados_anteriores,
    dados_novos,
    usuario_email,
    req
  ) {
    return await this.criarLog({
      usuario_email,
      acao: "UPDATE",
      tabela_afetada: tabela,
      dados_anteriores,
      dados_novos,
      user_agent: req.headers["user-agent"] || null,
    });
  }

  async logDelecao(tabela, dados_anteriores, usuario_email, req) {
    return await this.criarLog({
      usuario_email,
      acao: "DELETE",
      tabela_afetada: tabela,
      dados_anteriores,
      user_agent: req.headers["user-agent"] || null,
    });
  }

  async logLogin(usuario_email, sucesso, req) {
    try {
      const log = new AuditoriaLog({
        usuario_email,
        acao: sucesso ? "LOGIN_SUCCESS" : "LOGIN_FAILED",
        tabela_afetada: "usuarios",
        dados_anteriores: null,
        dados_novos: { sucesso, timestamp: new Date().toISOString() },
        user_agent: req.headers["user-agent"] || null,
      });

      return await this.repository.create(log.toDatabase());
    } catch (error) {
      throw error;
    }
  }

  async logLogout(usuario_email, req) {
    try {
      const log = new AuditoriaLog({
        usuario_email,
        acao: "LOGOUT",
        tabela_afetada: "usuarios",
        dados_anteriores: null,
        dados_novos: { timestamp: new Date().toISOString() },
        user_agent: req.headers["user-agent"] || null,
      });

      return await this.repository.create(log.toDatabase());
    } catch (error) {
      throw error;
    }
  }
}
