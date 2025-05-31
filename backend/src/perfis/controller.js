import { perfisService } from "./service.js";

export const getAllPerfis = async (_, res) => {
  try {
    const perfis = await perfisService.findAll();
    res.status(200).json(perfis);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar perfis: " + error.message });
  }
};

export const getPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const perfil = await perfisService.findOne(id);
    if (!perfil) {
      return res.status(404).json({ error: "Perfil não encontrado" });
    }
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfil: " + error.message });
  }
};

export const createPerfil = async (req, res) => {
  try {
    const dados = req.body;
    await perfisService.create(dados);
    res.status(201).json({ message: "Modulo criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar perfil: " + error.message });
  }
};


export const updatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await perfisService.update(id, dados);
    res.status(200).json({ message: "Perfil atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar Perfil: " + error.message });
  }
};

export const patchPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await perfisService.update(id, dados);
    res.status(200).json({ message: "Perfil atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar Perfil: " + error.message });
  }
};

export const deletePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    await perfisService.remove(id);
    res.status(200).json({ message: "Perfil removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover perfil: " + error.message });
  }
};