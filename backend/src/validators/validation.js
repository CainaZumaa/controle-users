// @ts-nocheck
import { analyzePassword } from "../passwordCheckController/passwordController.js";

export class Validation {
  // Validação de Email
  static validateEmail(email) {
    if (!email || typeof email !== "string") {
      return {
        isValid: false,
        error: "Email é obrigatório e deve ser uma string.",
      };
    }

    const formattedEmail = email.trim();

    if (formattedEmail.length === 0) {
      return { isValid: false, error: "O email não pode ser vazio." };
    }

    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(?:\.[a-zA-Z]{2,6})?$/;

    if (!emailRegex.test(formattedEmail)) {
      return { isValid: false, error: this.getEmailError(formattedEmail) };
    }

    return { isValid: true, value: formattedEmail.toLowerCase() };
  }

  static getEmailError(email) {
    if (!email.includes("@")) return "O email deve conter o símbolo '@'.";
    if (email.split("@").length > 2)
      return "O email deve conter apenas um símbolo '@'.";
    if (email.includes(" ")) return "O email não pode conter espaços.";
    if (email.startsWith("@") || email.endsWith("@"))
      return "O email não pode começar ou terminar com '@'.";
    if (!email.includes("."))
      return "O email deve conter um ponto (.) no domínio.";
    return "Formato de email inválido (ex: usuario@dominio.com).";
  }

  // Validação de Nome
  static validateNome(nome) {
    if (typeof nome !== "string") {
      return { isValid: false, error: "Nome deve ser uma string." };
    }

    const trimmedNome = nome.trim();

    if (trimmedNome.length < 2) {
      return {
        isValid: false,
        error: "Nome deve ter pelo menos 2 caracteres.",
      };
    }

    if (trimmedNome.length > 100) {
      return {
        isValid: false,
        error: "Nome deve ter no máximo 100 caracteres.",
      };
    }

    if (/^\d+$/.test(trimmedNome)) {
      return {
        isValid: false,
        error: "Nome não pode ser composto apenas por números.",
      };
    }

    if (/\s{2,}/.test(trimmedNome)) {
      return {
        isValid: false,
        error: "Nome não pode ter espaços consecutivos.",
      };
    }

    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmedNome)) {
      return { isValid: false, error: "Nome contém caracteres inválidos." };
    }

    return { isValid: true, value: trimmedNome };
  }

  // Validação de Senha
  static validatePassword(senha) {
    if (!senha || typeof senha !== "string" || senha.trim().length === 0) {
      return {
        isValid: false,
        error: "Senha é obrigatória e não pode ser vazia.",
      };
    }

    const passwordAnalysis = analyzePassword(senha);
    if (passwordAnalysis.password_strength === "weak") {
      return {
        isValid: false,
        error: "Senha muito fraca.",
        details: passwordAnalysis,
      };
    }

    return { isValid: true, value: senha };
  }

  // Validação de ID
  static validateId(id) {
    if (!id || isNaN(id) || parseInt(id) <= 0) {
      return {
        isValid: false,
        error: "ID deve ser um número válido maior que zero.",
      };
    }
    return { isValid: true, value: parseInt(id) };
  }

  // Validação completa de usuário para criação
  static validateCreateUsuario(data) {
    const errors = [];
    const validatedData = {};

    // Verificar se todos os campos obrigatórios estão presentes
    if (!data.nome || !data.email || !data.senha) {
      return {
        isValid: false,
        error: "Nome, email e senha são obrigatórios.",
      };
    }

    // Validação de nome
    const nomeValidation = this.validateNome(data.nome);
    if (!nomeValidation.isValid) {
      errors.push(nomeValidation.error);
    } else {
      validatedData.nome = nomeValidation.value;
    }

    // Validação de email
    const emailValidation = this.validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push(emailValidation.error);
    } else {
      validatedData.email = emailValidation.value;
    }

    // Validação de senha
    const passwordValidation = this.validatePassword(data.senha);
    if (!passwordValidation.isValid) {
      if (passwordValidation.details) {
        return {
          isValid: false,
          error: passwordValidation.error,
          details: passwordValidation.details,
        };
      }
      errors.push(passwordValidation.error);
    } else {
      validatedData.senha = passwordValidation.value;
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : null,
      data: validatedData,
    };
  }

  // Validação de usuário para atualização
  static validateUpdateUsuario(data) {
    const errors = [];
    const validatedData = {};

    if (data.nome !== undefined) {
      const nomeValidation = this.validateNome(data.nome);
      if (!nomeValidation.isValid) {
        errors.push(nomeValidation.error);
      } else {
        validatedData.nome = nomeValidation.value;
      }
    }

    if (data.email !== undefined) {
      const emailValidation = this.validateEmail(data.email);
      if (!emailValidation.isValid) {
        errors.push(emailValidation.error);
      } else {
        validatedData.email = emailValidation.value;
      }
    }

    if (data.senha !== undefined) {
      const passwordValidation = this.validatePassword(data.senha);
      if (!passwordValidation.isValid) {
        if (passwordValidation.details) {
          return {
            isValid: false,
            error: passwordValidation.error,
            details: passwordValidation.details,
          };
        }
        errors.push(passwordValidation.error);
      } else {
        validatedData.senha = passwordValidation.value;
      }
    }

    if (Object.keys(validatedData).length === 0) {
      return {
        isValid: false,
        error: "Nenhum dado válido fornecido para atualização.",
      };
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : null,
      data: validatedData,
    };
  }
}
