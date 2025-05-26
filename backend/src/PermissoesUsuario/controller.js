import { permissoesUsuarioService } from "./service.js";

export const getAllPermissoesUsuario = async (_, res) => {
  try {
    const permissoesUsuario = await permissoesUsuarioService.findAll();
    res.status(200).json(permissoesUsuario);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar: " + error.message });
  }
};

export const getPermissaoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const permissoesUsuario = await permissoesUsuarioService.findOne(id);
    if (!permissoesUsuario) {
      return res.status(404).json({ error: "não encontrado" });
    }
    res.status(200).json(permissoesUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar: " + error.message });
  }
};

export const createPermissoesUsuario = async (req, res) => {
  try {
    const dados = req.body;
    await permissoesUsuarioService.create(dados);
    res.status(201).json({ message: "criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar: " + error.message });
  }
};

export const updatePermissoesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await permissoesUsuarioService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const patchPermissoesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await permissoesUsuarioService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const deletePermissoesUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await permissoesUsuarioService.remove(id);
    res.status(200).json({ message: "removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover: " + error.message });
  }
};
