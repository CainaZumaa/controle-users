import { usuariosService } from "./service.js";

export const getAllUsuarios = async (_, res) => {
  try {
    const usuarios = await usuariosService.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar usuários: " + error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuariosService.findOne(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário: " + error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Nome, email e senha são obrigatórios" });
    }

    await usuariosService.create({ nome, email, senha });
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário: " + error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await usuariosService.update(id, dados);
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar usuário: " + error.message });
  }
};

export const patchUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await usuariosService.update(id, dados);
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar usuário: " + error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuariosService.remove(id);
    res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover usuário: " + error.message });
  }
};
