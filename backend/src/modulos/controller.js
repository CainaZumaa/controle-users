import { modulosService } from "./service.js";

export const getAllModulos = async (req, res) => {
    const modulos = await modulosService.findAll();
    res.status(200).json(modulos);
};

export const getModulos = async (req, res) => {
    const { id } = req.params;
    const modulos = await modulosService.findOne(id);
    if (!modulos) {
      return res.status(404).json({ error: "Modulo não encontrado" });
    }
    res.status(200).json(modulos);
};

export const createModulos = async (req, res) => {
  try {
    const dados = req.body;
    await modulosService.create(dados);
    res.status(201).json({ message: "Modulo criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar modulo: " + error.message });
  }
};

export const updateModulos = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await modulosService.update(id, dados);
    res.status(200).json({ message: "Modulo atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar modulo: " + error.message });
  }
};

export const patchModulos = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    await modulosService.update(id, dados);
    res.status(200).json({ message: "Modulo atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar os modulos: " + error.message });
  }
};

export const deleteModulos = async (req, res) => {
  try {
    const { id } = req.params;
    await modulosService.remove(id);
    res.status(200).json({ message: "Módulo removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover módulo: " + error.message });
  }
}
export const incrementar_acessos = async (req, res) => {
  try { 
    const { id } = req.params;
    const modulo = await modulosService.incrementar_acessos(id)
    res.status(200).json({ success: true, data:modulo });
  } catch (error) {
      res
        .status(500)
        .json({ sucesses: false, error: error.message });
  }
}
export const buscar_modulo_mais_acessado  = async (req, res) => {
  try { 
    const modulo = await modulosService.buscar_modulo_mais_acessado()
    res.status(200).json({ success: true, data:modulo });
  } catch (error) {
      res
        .status(500)
        .json({ sucesses: false, error: error.message });
  }
}
export const buscar_modulo_menos_acessado  = async (req, res) => {
  try { 
    const modulo = await modulosService.buscar_modulo_menos_acessado()
    res.status(200).json({ success: true, data:modulo });
  } catch (error) {
      res
        .status(500)
        .json({ sucesses: false, error: error.message });
  }
}
export const buscarPorNome = async (req, res) => {
  const modulos = await modulosService.buscar_por_nome(req.query.nome);
  res.json(modulos);
};

export const paginacao = async (req, res) => {
  const { pagina = 1, limite = 10, ordem = "asc" } = req.query;
  const modulos = await modulosService.listar_modulos_paginado(+pagina, +limite, ordem);
  res.json(modulos);
};

export const contar = async (_req, res) => {
  const total = await modulosService.contar_total_modulos();
  res.json({ total });
};

export const resetar = async (_req, res) => {
  const result = await modulosService.resetar_acessos();
  res.json(result);
};
export const nomeExiste = async (req, res) => {
  try {
    const { nome } = req.query;
    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }
    const existe = await modulosService.nome_existe(nome);
    res.json({ existe });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
export const ultimos = async (req, res) => {
  const qtd = +req.query.qtd || 5;
  const modulos = await modulosService.buscar_ultimos_modulos(qtd);
  res.json(modulos);
};

export const acessosMinimos = async (req, res) => {
  const minimo = +req.query.min || 10;
  const modulos = await modulosService.buscar_modulos_com_muitos_acessos(minimo);
  res.json(modulos);
};

export const porcentagemAcessos = async (_req, res) => {
  try {
    const resultado = await modulosService.porcentagem_de_acessos();
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
;