import db from "./db.js";

async function testConnection() {
  try {
    const result = await db.raw("SELECT NOW()");
    console.log("Conexão bem-sucedida:", result.rows);
  } catch (err) {
    console.error("Erro ao conectar:", err);
  } finally {
    await db.destroy();
  }
}

testConnection();
