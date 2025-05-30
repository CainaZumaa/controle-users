import { permissoesService } from "./service.js";

export const getAllPermissoes = async (_, res) => {
  try {
    const permissao = await permissoesService.findAll();
    res.status(200).json(permissao);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar Permissão: " + error.message });
  }
};

export const getPermissao = async (req, res) => {
  try {
    const { id } = req.params;
    const permissao = await permissoesService.findOne(id);
    if (!permissao) {
      return res.status(404).json({ error: "Permissão não encontrado" });
    }
    res.status(200).json(permissao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar permissão: " + error.message });
  }
};

export const createPermissao = async (req, res) => {
  try {
    const dados = req.body;
    await permissoesService.create(dados);
    res.status(201).json({ message: "Permissão criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar permissão: " + error.message });
  }
};

export const updatePermissao = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await permissoesService.update(id, dados);
    res.status(200).json({ message: "Permissão atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar permissão: " + error.message });
  }
};

export const patchPermissao = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await permissoesService.update(id, dados);
    res.status(200).json({ message: "Permissão atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar permissão: " + error.message });
  }
};

export const deletePermissao = async (req, res) => {
  try {
    const { id } = req.params;
    await permissoesService.remove(id);
    res.status(200).json({ message: "Permissão removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover permissão: " + error.message });
  }
};
