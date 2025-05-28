import { rolesPermissoesService } from "./service.js";

export const getAllRolesPermissoes = async (_, res) => {
  try {
    const rolesPermissoes = await rolesPermissoesService.findAll();
    res.status(200).json(rolesPermissoes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar: " + error.message });
  }
};

export const getRolePermissao = async (req, res) => {
  try {
    const { id } = req.params;
    const rolesPermissoes = await rolesPermissoesService.findOne(id);
    if (!rolesPermissoes) {
      return res.status(404).json({ error: "não encontrado" });
    }
    res.status(200).json(rolesPermissoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar: " + error.message });
  }
};

export const createRolePermissao = async (req, res) => {
  try {
    const dados = req.body;
    await rolesPermissoesService.create(dados);
    res.status(201).json({ message: "criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar: " + error.message });
  }
};

export const updateRolePermissao = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await rolesPermissoesService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const patchRolePermissao = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await rolesPermissoesService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const deleteRolePermissao = async (req, res) => {
  try {
    const { id } = req.params;
    await rolesPermissoesService.remove(id);
    res.status(200).json({ message: "removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover: " + error.message });
  }
};
