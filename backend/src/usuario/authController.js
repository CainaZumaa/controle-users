// @ts-nocheck
import jwt from "jsonwebtoken";
import { usuariosService } from "./service.js";

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await usuariosService.authenticate(email, senha);
    if (!usuario) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    await usuariosService.checkAndUpdateLogin(usuario.id);

    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        is_active: usuario.is_active,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (error) {
    if (error.message.includes("inativa")) {
      return res.status(403).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao fazer login: " + error.message });
  }
};
