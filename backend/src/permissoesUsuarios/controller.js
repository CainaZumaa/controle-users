import { permissoesUsuariosService } from "./service.js";

export const getAllPermissoesUsuarios = async (_, res) => {
  try {
    const permissoesUsuarios = await permissoesUsuariosService.findAll();
    res.status(200).json(permissoesUsuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar: " + error.message });
  }
};

export const getPermissaoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const permissoesUsuario = await permissoesUsuariosService.findOne(id);
    if (!permissoesUsuario) {
      return res.status(404).json({ error: "não encontrado" });
    }
    res.status(200).json(permissoesUsuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar: " + error.message });
  }
};

export const createPermissaoUsuario = async (req, res) => {
  try {
    const dados = req.body;
    await permissoesUsuariosService.create(dados);
    res.status(201).json({ message: "criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar: " + error.message });
  }
};

export const updatePermissaoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await permissoesUsuariosService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const patchPermissaoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await permissoesUsuariosService.update(id, dados);
    res.status(200).json({ message: "atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar: " + error.message });
  }
};

export const deletePermissaoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await permissoesUsuariosService.remove(id);
    res.status(200).json({ message: "removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover: " + error.message });
  }
};
