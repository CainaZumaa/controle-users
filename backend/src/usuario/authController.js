// @ts-nocheck
import jwt from "jsonwebtoken";
import { usuariosService } from "./service.js";

export const register = async (req, res) => {
  try {
    await usuariosService.create(req.body);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await usuariosService.authenticate(email, senha);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
