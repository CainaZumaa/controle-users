import { ComentariosRepository } from "./repository.js";
import { Comentario } from "./model.js";

export class ComentariosService {
  constructor() {
    this.repository = new ComentariosRepository();
  }

  async criarComentario(dados) {
    try {
      Comentario.validate(dados);
      const comentario = new Comentario(dados);
      return await this.repository.create(comentario.toDatabase());
    } catch (error) {
      throw error;
    }
  }

  async listarComentarios(filtros = {}, page = 1, limit = 50) {
    const offset = (page - 1) * limit;

    const comentarios = await this.repository.findAll({
      ...filtros,
      limit,
      offset,
    });

    return {
      comentarios,
      pagination: {
        page,
        limit,
        hasMore: comentarios.length === limit,
      },
    };
  }

  async buscarComentarioPorId(id) {
    const comentario = await this.repository.findById(id);

    if (!comentario) {
      throw new Error("Comentário não encontrado");
    }

    return comentario;
  }

  async buscarComentariosPorUsuario(usuario_email, limit = 50) {
    return await this.repository.findByUsuario(usuario_email, limit);
  }

  async buscarComentariosPorTipo(tipo, limit = 50) {
    return await this.repository.findByTipo(tipo, limit);
  }

  async atualizarComentario(id, dados) {
    const comentario = await this.repository.findById(id);

    if (!comentario) {
      throw new Error("Comentário não encontrado");
    }

    return await this.repository.update(id, dados);
  }

  async deletarComentario(id) {
    const comentario = await this.repository.findById(id);

    if (!comentario) {
      throw new Error("Comentário não encontrado");
    }

    await this.repository.delete(id);
    return { message: "Comentário removido com sucesso" };
  }
}
