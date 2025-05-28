// @ts-nocheck
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendMagicLinkEmail = async (email, magicToken) => {
  const magicLink = `${
    process.env.FRONTEND_URL || "http://localhost:3000"
  }/auth/magic/verify?token=${magicToken}`;

  const mailOptions = {
    from: {
      name: "User Management",
      address: process.env.GMAIL_USER,
    },
    to: email,
    subject: "🔐 Seu Link de Acesso Rápido",
    html: generateMagicLinkTemplate(magicLink, email, magicToken),
    text: `Clique no link para acessar sua conta: ${magicLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `Magic link enviado para: ${email} - MessageId: ${info.messageId}`
    );
    return info;
  } catch (error) {
    console.error("Erro ao enviar email:", error.message);
    throw new Error("Falha ao enviar email de acesso");
  }
};

const generateMagicLinkTemplate = (magicLink, userEmail, magicToken) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso Rápido - Controle Users</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
  
  <div style="background: white; border-radius: 10px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🔐 Controle Users</h1>
      <p style="color: #7f8c8d; margin: 10px 0 0 0; font-size: 16px;">Acesso Rápido e Seguro</p>
    </div>
    
    <div style="background: #ecf0f1; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
      <p style="margin: 0; color: #2c3e50; font-size: 16px;">
        Olá! 👋<br>
        Você solicitou acesso rápido para <strong>${userEmail}</strong>
      </p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${magicLink}" 
         style="display: inline-block; background-color: #2196F3; 
                color: white; padding: 14px 36px; text-decoration: none; border-radius: 30px; 
                font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
                transition: background 0.3s ease, transform 0.2s ease;"
         onmouseover="this.style.backgroundColor='#1976D2'; this.style.transform='scale(1.03)'"
         onmouseout="this.style.backgroundColor='#2196F3'; this.style.transform='scale(1)'">
        🔑 Acessar Minha Conta
      </a>
    </div>
    
    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 25px 0;">
      <p style="margin: 0; color: #856404; font-size: 14px;">
        ⏰ <strong>Importante:</strong> Este link expira em <strong>15 minutos</strong> por segurança.
      </p>
    </div>
    
    <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; margin-top: 30px;">
      <div style="background-color: #f0f0f0; padding: 12px 20px; border-radius: 6px; margin-bottom: 15px;">
        <p style="margin: 0; font-size: 14px; color: #555;">
          🔑 <strong>Seu token:</strong> ${magicToken}
        </p>
      </div>
      <p style="color: #95a5a6; font-size: 13px; text-align: center; margin: 0;">
        Se você não solicitou este acesso, pode ignorar este email com segurança.<br>
        Este link só funciona uma vez e expira automaticamente.
      </p>
    </div>
    
  </div>
  
  <div style="text-align: center; margin-top: 20px;">
    <p style="color: #bdc3c7; font-size: 12px; margin: 0;">
      © 2024 Controle Users - Sistema de Gerenciamento de Usuários
    </p>
  </div>
  
</body>
</html>
`;

// testar configuração do email
export const testEmailConfiguration = async () => {
  try {
    await transporter.verify();
    console.log("✅ Configuração de email válida");
    return true;
  } catch (error) {
    console.error("❌ Erro na configuração de email:", error.message);
    return false;
  }
};

// enviar email de boas-vindas
export const sendWelcomeEmail = async (email, userName) => {
  const mailOptions = {
    from: {
      name: "Controle Users",
      address: process.env.GMAIL_USER,
    },
    to: email,
    subject: "🎉 Bem-vindo ao Controle Users!",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #2c3e50; font-size: 26px; margin-bottom: 10px;">🎉 Bem-vindo, ${userName}!</h2>
          <p style="color: #7f8c8d; font-size: 16px; margin: 0;">Sua conta foi criada com sucesso no <strong>Controle Users</strong>.</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px 25px; border-radius: 8px; margin-bottom: 30px;">
          <p style="font-size: 15px; color: #34495e; margin: 0 0 15px 0;">
            Agora você pode fazer login usando seu e-mail e senha, ou solicitar um link de acesso rápido.
          </p>
          <p style="font-size: 14px; color: #7f8c8d; margin: 0;">
            Se precisar de ajuda, estamos aqui para você.
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}" 
            style="display: inline-block; background-color: #2196F3; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 15px; 
                    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3); transition: background 0.3s ease;">
            🚀 Acessar Plataforma
          </a>
        </div>

        <div style="text-align: center; margin-top: 40px;">
          <p style="color: #bdc3c7; font-size: 12px; margin: 0;">
            © 2024 Controle Users - Sistema de Gerenciamento de Usuários
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email de boas-vindas enviado para: ${email}`);
    return info;
  } catch (error) {
    console.error("Erro ao enviar email de boas-vindas:", error.message);
    throw error;
  }
};
