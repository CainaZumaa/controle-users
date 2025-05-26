// @ts-nocheck
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

export const sendMagicLinkEmail = async (email, authToken) => {
  try {
    // Link direto para o frontend com o JWT
    const magicLink = `http://seufrontend.com/auth/callback?token=${authToken}`;

    const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #333;">Tentativa de Acesso Detectada</h2>
      <p>Olá,</p>
      <p>Recebemos uma solicitação para acessar sua conta. Clique no botão abaixo para entrar:</p>
      <a href="${magicLink}" style="/* estilos mantidos */">Acessar Minha Conta</a>
      <p><small>Este link expira em 15 minutos</small></p>
    </div>
    `;

    const info = await transporter.sendMail({
      from: '"Seu Sistema" <no-reply@seusistema.com>',
      to: email,
      subject: "🔑 Seu Link de Acesso",
      html: emailHTML,
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
};
