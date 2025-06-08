import { RolesService } from "./service.js";

export const getAllRoles = async (_, res) => {
  try {
    const roles = await RolesService.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar: " + error.message });
  }
};

export const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await RolesService.findOne(id);
    if (!roles) {
      return res.status(404).json({ error: "não encontrado" });
    }
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar: " + error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const dados = req.body;
    await RolesService.create(dados);
    res.status(201).json({ message: "criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar: " + error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await RolesService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const patchRole = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await RolesService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await RolesService.remove(id);
    res.status(200).json({ message: "removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover: " + error.message });
  }
};
