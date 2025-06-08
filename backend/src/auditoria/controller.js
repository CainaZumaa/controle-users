import { AuditoriaService } from "./service.js";

export class AuditoriaController {
  constructor() {
    this.service = new AuditoriaService();
  }

  // GET /auditoria/logs
  listarLogs = async (req, res) => {
    try {
      const {
        usuario_email,
        tabela_afetada,
        acao,
        data_inicio,
        data_fim,
        page = 1,
        limit = 50,
      } = req.query;

      const filtros = {};
      if (usuario_email) filtros.usuario_email = usuario_email;
      if (tabela_afetada) filtros.tabela_afetada = tabela_afetada;
      if (acao) filtros.acao = acao;
      if (data_inicio) filtros.data_inicio = data_inicio;
      if (data_fim) filtros.data_fim = data_fim;

      const resultado = await this.service.listarLogs(
        filtros,
        parseInt(page),
        parseInt(limit)
      );

      res.json({
        success: true,
        data: resultado.logs,
        pagination: resultado.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao listar logs de auditoria",
        details: error.message,
      });
    }
  };

  // GET /auditoria/logs/:id
  buscarLogPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const log = await this.service.buscarLogPorId(parseInt(id));

      res.json({
        success: true,
        data: log,
      });
    } catch (error) {
      const status = error.message.includes("não encontrado") ? 404 : 500;
      res.status(status).json({
        success: false,
        error: error.message,
      });
    }
  };

  // POST /auditoria/logs
  criarLog = async (req, res) => {
    try {
      const logData = req.body;
      const log = await this.service.criarLog({
        ...logData,
        req,
      });

      res.status(201).json({
        success: true,
        data: log,
        message: "Log de auditoria criado com sucesso",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao criar log de auditoria",
        details: error.message,
      });
    }
  };

  // GET /auditoria/usuarios/:email
  buscarLogsPorUsuario = async (req, res) => {
    try {
      const { email } = req.params;
      const { limit = 50 } = req.query;

      const logs = await this.service.buscarLogsPorUsuario(
        decodeURIComponent(email),
        parseInt(limit)
      );

      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao buscar logs do usuário",
        details: error.message,
      });
    }
  };

  // GET /auditoria/acoes
  obterAcoesDisponiveis = async (req, res) => {
    try {
      const acoes = await this.service.obterAcoesDisponiveis();

      res.json({
        success: true,
        data: acoes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao obter ações disponíveis",
        details: error.message,
      });
    }
  };

  // GET /auditoria/tabelas
  obterTabelasAfetadas = async (req, res) => {
    try {
      const tabelas = await this.service.obterTabelasAfetadas();

      res.json({
        success: true,
        data: tabelas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao obter tabelas afetadas",
        details: error.message,
      });
    }
  };

  // DELETE /auditoria/logs/cleanup
  limparLogsAntigos = async (req, res) => {
    try {
      const { dias = 90 } = req.query;
      const resultado = await this.service.limparLogsAntigos(parseInt(dias));

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao limpar logs antigos",
        details: error.message,
      });
    }
  };

  // GET /auditoria/estatisticas
  obterEstatisticas = async (req, res) => {
    try {
      const { data_inicio, data_fim } = req.query;

      const filtros = {};
      if (data_inicio) filtros.data_inicio = data_inicio;
      if (data_fim) filtros.data_fim = data_fim;

      const estatisticas = await this.service.obterEstatisticas(filtros);

      res.json({
        success: true,
        data: estatisticas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Erro ao obter estatísticas",
        details: error.message,
      });
    }
  };
}
