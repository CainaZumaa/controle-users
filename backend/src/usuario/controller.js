// @ts-nocheck
import { usuariosService } from "./service.js";
import { sendWelcomeEmail } from "../magicAuth/emailService.js";
import { analyzePassword } from "../passwordCheckController/passwordController.js";

const getEmailValidationError = (email) => {
  if (!email || typeof email !== "string") {
    return "Email é obrigatório e deve ser uma string.";
  }

  const formattedEmail = email.trim();

  if (formattedEmail.length === 0) {
    return "O email não pode ser vazio.";
  }

  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(?:\.[a-zA-Z]{2,6})?$/;

  if (!emailRegex.test(formattedEmail)) {
    if (!formattedEmail.includes("@")) {
      return "O email deve conter o símbolo '@'.";
    }
    if (formattedEmail.split("@").length > 2) {
      return "O email deve conter apenas um símbolo '@'.";
    }
    if (formattedEmail.includes(" ")) {
      return "O email não pode conter espaços.";
    }
    if (formattedEmail.startsWith("@") || formattedEmail.endsWith("@")) {
      return "O email não pode começar ou terminar com '@'.";
    }
    if (!formattedEmail.includes(".")) {
      return "O email deve conter um ponto (.) no domínio.";
    }
    return "Formato de email inválido (ex: usuario@dominio.com).";
  }

  return null;
};

const validateNome = (nome) => {
  if (typeof nome !== "string") {
    return "Nome deve ser uma string.";
  }

  const trimmedNome = nome.trim();

  if (trimmedNome.length < 2) {
    return "Nome deve ter pelo menos 2 caracteres.";
  }

  if (trimmedNome.length > 100) {
    return "Nome deve ter no máximo 100 caracteres.";
  }

  if (/^\d+$/.test(trimmedNome)) {
    return "Nome não pode ser composto apenas por números.";
  }

  if (/\s{2,}/.test(trimmedNome)) {
    return "Nome não pode ter espaços consecutivos.";
  }

  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedNome)) {
    return "Nome contém caracteres inválidos.";
  }

  return null;
};

export const getAllUsuarios = async (_, res) => {
  try {
    const usuarios = await usuariosService.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro em getAllUsuarios:", error.stack);
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
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(`Erro em getUsuario [ID: ${req.params.id}]:`, error.stack);
    res.status(500).json({ error: "Erro ao buscar usuário: " + error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    let { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Nome, email e senha são obrigatórios." });
    }

    const nomeError = validateNome(nome);
    if (nomeError) {
      return res.status(400).json({ error: nomeError });
    }
    nome = nome.trim();

    const emailError = getEmailValidationError(email);
    if (emailError) {
      return res.status(400).json({ error: emailError });
    }
    email = email.toLowerCase().trim();

    if (!senha || typeof senha !== "string" || senha.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Senha é obrigatória e não pode ser vazia." });
    }

    const passwordAnalysis = analyzePassword(senha);
    if (passwordAnalysis.password_strength === "weak") {
      return res.status(400).json({
        error: "Senha muito fraca.",
        details: passwordAnalysis,
      });
    }

    const existingUser = await usuariosService.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email já está em uso." });
    }

    const novoUsuario = await usuariosService.create({
      nome,
      email,
      senha,
    });

    try {
      await sendWelcomeEmail(email, nome);
    } catch (emailError) {
      console.warn(
        "Usuário criado, mas falha ao enviar e-mail de boas-vindas:",
        emailError.message
      );
    }

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error("Erro em createUsuario:", error.stack);
    res.status(500).json({ error: "Erro ao criar usuário: " + error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const usuarioExistente = await usuariosService.findOne(id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const dadosParaAtualizar = {};

    if (dados.nome !== undefined) {
      const nomeError = validateNome(dados.nome);
      if (nomeError) {
        return res.status(400).json({ error: nomeError });
      }
      dadosParaAtualizar.nome = dados.nome.trim();
    }

    if (dados.email !== undefined) {
      const emailError = getEmailValidationError(dados.email);
      if (emailError) {
        return res.status(400).json({ error: emailError });
      }

      const sanitizedEmail = dados.email.toLowerCase().trim();
      const existingUserWithEmail = await usuariosService.findByEmail(
        sanitizedEmail
      );
      if (existingUserWithEmail && existingUserWithEmail.id.toString() !== id) {
        return res
          .status(409)
          .json({ error: "Email já está em uso por outro usuário." });
      }
      dadosParaAtualizar.email = sanitizedEmail;
    }

    if (dados.senha !== undefined) {
      if (typeof dados.senha !== "string" || dados.senha.length === 0) {
        return res.status(400).json({ error: "A senha não pode ser vazia." });
      }
      const passwordAnalysis = analyzePassword(dados.senha);
      if (passwordAnalysis.password_strength === "weak") {
        return res.status(400).json({
          error: "Senha muito fraca.",
          details: passwordAnalysis,
        });
      }
      dadosParaAtualizar.senha = dados.senha;
    }

    if (Object.keys(dadosParaAtualizar).length === 0) {
      return res
        .status(400)
        .json({ error: "Nenhum dado válido fornecido para atualização." });
    }

    await usuariosService.update(id, dadosParaAtualizar);
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error(`Erro em updateUsuario [ID: ${req.params.id}]:`, error.stack);
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

    const usuarioExistente = await usuariosService.findOne(id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await usuariosService.remove(id);
    res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    console.error(`Erro em deleteUsuario [ID: ${req.params.id}]:`, error.stack);
    res
      .status(500)
      .json({ error: "Erro ao remover usuário: " + error.message });
  }
};
