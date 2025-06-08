import { rolesUsuariosService } from "./service.js";

export const getAllRolesUsuarios = async (_, res) => {
  try {
    const permissoesUsuario = await rolesUsuariosService.findAll();
    res.status(200).json(permissoesUsuario);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar: " + error.message });
  }
};

export const getRolesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const permissoesUsuario = await rolesUsuariosService.findOne(id);
    if (!permissoesUsuario) {
      return res.status(404).json({ error: "não encontrado" });
    }
    res.status(200).json(permissoesUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar: " + error.message });
  }
};

export const createRolesUsuario = async (req, res) => {
  try {
    const dados = req.body;
    await rolesUsuariosService.create(dados);
    res.status(201).json({ message: "criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar: " + error.message });
  }
};

export const updateRolesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await rolesUsuariosService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const patchRolesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await rolesUsuariosService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const deleteRolesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await rolesUsuariosService.remove(id);
    res.status(200).json({ message: "removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover: " + error.message });
  }
};
