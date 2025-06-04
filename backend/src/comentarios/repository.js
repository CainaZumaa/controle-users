import db from "../../db.js";
import { Comentario } from "./model.js";

export class ComentariosRepository {
  async create(comentario) {
    const [result] = await db("comentarios").insert(comentario).returning("id");
    const id = typeof result === "object" ? result.id : result;
    const comentarioCriado = await this.findById(id);
    return comentarioCriado;
  }

  async findAll(filtros = {}) {
    const query = db("comentarios").select("*");

    if (filtros.usuario_email) {
      query.where("usuario_email", filtros.usuario_email);
    }

    if (filtros.tipo) {
      query.where("tipo", filtros.tipo);
    }

    if (filtros.status) {
      query.where("status", filtros.status);
    }

    if (filtros.limit) {
      query.limit(filtros.limit);
    }

    if (filtros.offset) {
      query.offset(filtros.offset);
    }

    query.orderBy("created_at", "desc");

    const comentarios = await query;
    return comentarios.map(Comentario.fromDatabase);
  }

  async findById(id) {
    const comentario = await db("comentarios").where("id", id).first();

    return comentario ? Comentario.fromDatabase(comentario) : null;
  }

  async findByUsuario(usuario_email, limit = 50) {
    const comentarios = await db("comentarios")
      .where("usuario_email", usuario_email)
      .orderBy("created_at", "desc")
      .limit(limit);

    return comentarios.map(Comentario.fromDatabase);
  }

  async findByTipo(tipo, limit = 50) {
    const comentarios = await db("comentarios")
      .where("tipo", tipo)
      .orderBy("created_at", "desc")
      .limit(limit);

    return comentarios.map(Comentario.fromDatabase);
  }

  async update(id, dados) {
    await db("comentarios")
      .where("id", id)
      .update({
        ...dados,
        updated_at: new Date().toISOString(),
      });

    return this.findById(id);
  }

  async delete(id) {
    const comentario = await this.findById(id);
    if (comentario) {
      await db("comentarios").where("id", id).delete();
    }
    return comentario;
  }
}
