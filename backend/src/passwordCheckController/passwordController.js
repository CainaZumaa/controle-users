export const checkPasswordStrength = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Senha é obrigatória" });
    }

    const analysis = analyzePassword(password);

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Erro ao analisar senha: " + error.message });
  }
};

const analyzePassword = (password) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    no_common: !isCommonPassword(password),
  };

  score += checks.length ? 2 : 0;
  score += checks.uppercase ? 1 : 0;
  score += checks.lowercase ? 1 : 0;
  score += checks.numbers ? 1 : 0;
  score += checks.symbols ? 2 : 0;
  score += checks.no_common ? 1 : 0;

  let strength;
  if (score <= 3) strength = "weak";
  else if (score <= 6) strength = "medium";
  else strength = "strong";

  return {
    password_strength: strength,
    score: `${score}/8`,
    checks,
    recommendations: getRecommendations(checks),
  };
};

const isCommonPassword = (password) => {
  const common = [
    "123456",
    "password",
    "123456789",
    "12345678",
    "12345",
    "qwerty",
  ];
  return common.includes(password.toLowerCase());
};

const getRecommendations = (checks) => {
  const recommendations = [];

  if (!checks.length) recommendations.push("Use pelo menos 8 caracteres");
  if (!checks.uppercase) recommendations.push("Adicione letras maiúsculas");
  if (!checks.lowercase) recommendations.push("Adicione letras minúsculas");
  if (!checks.numbers) recommendations.push("Adicione números");
  if (!checks.symbols) recommendations.push("Adicione símbolos especiais");
  if (!checks.no_common) recommendations.push("Evite senhas comuns");

  return recommendations.length ? recommendations : ["Senha forte!"];
};
