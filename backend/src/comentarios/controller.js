import { ComentariosService } from "./service.js";

export class ComentariosController {
  constructor() {
    this.service = new ComentariosService();
  }

  async criarComentario(req, res) {
    try {
      const { usuario_email, conteudo, tipo } = req.body;

      if (!usuario_email || !conteudo || !tipo) {
        return res.status(400).json({
          error: "Email do usuário, conteúdo e tipo são obrigatórios",
        });
      }

      const comentario = await this.service.criarComentario({
        usuario_email,
        conteudo,
        tipo,
      });

      res.status(201).json({
        success: true,
        data: comentario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async listarComentarios(req, res) {
    try {
      const { page = 1, limit = 50, tipo, status } = req.query;
      const filtros = { tipo, status };

      const resultado = await this.service.listarComentarios(
        filtros,
        parseInt(page),
        parseInt(limit)
      );

      res.json({
        success: true,
        data: resultado.comentarios,
        pagination: resultado.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async buscarComentario(req, res) {
    try {
      const comentario = await this.service.buscarComentarioPorId(
        parseInt(req.params.id)
      );

      res.json({
        success: true,
        data: comentario,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async atualizarComentario(req, res) {
    try {
      const { conteudo, tipo, status } = req.body;
      const id = parseInt(req.params.id);

      const comentario = await this.service.atualizarComentario(id, {
        conteudo,
        tipo,
        status,
      });

      res.json({
        success: true,
        data: comentario,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deletarComentario(req, res) {
    try {
      const resultado = await this.service.deletarComentario(
        parseInt(req.params.id)
      );

      res.json({
        success: true,
        data: resultado,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  }

  async buscarComentariosPorUsuario(req, res) {
    try {
      const { email } = req.params;
      const { limit = 50 } = req.query;

      const comentarios = await this.service.buscarComentariosPorUsuario(
        email,
        parseInt(limit)
      );

      res.json({
        success: true,
        data: comentarios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async buscarComentariosPorTipo(req, res) {
    try {
      const { tipo } = req.params;
      const { limit = 50 } = req.query;

      const comentarios = await this.service.buscarComentariosPorTipo(
        tipo,
        parseInt(limit)
      );

      res.json({
        success: true,
        data: comentarios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}
