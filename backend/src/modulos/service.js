import { repository_modulos } from "./repository.js";
import { Modulo } from "./model.js";

export const modulosService = {
  async create(dados) {
    Modulo.validate(dados);
    await repository_modulos.create(dados);
  },

  async findAll() {
    return await repository_modulos.findAll();
  },

  async findOne(id) {
    const modulos = await repository_modulos.findOne(id);
    if (!modulos) throw new Error("Módulo não encontrado");
    return modulos;
  },

  async update(id, dados) {
    Modulo.validate(dados);
    const modulosExistente = await repository_modulos.findOne(id);
    if (!modulosExistente) throw new Error("Módulo não encontrado");
    await repository_modulos.update(id, dados);
  },

  async patch(id, dados) {
    Modulo.validate(dados);
    const modulosExistente = await repository_modulos.findOne(id);
    if (!modulosExistente) throw new Error("Módulo não encontrado");
    await repository_modulos.patch(id, dados);
  },

  async remove(id) {
    const modulosExistente = await repository_modulos.findOne(id);
    if (!modulosExistente) throw new Error("Módulo não encontrado");
    await repository_modulos.remove(id);
  },
};
