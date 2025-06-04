import { modulosService } from "./service.js";

export const getAllModulos = async (req, res) => {
  try {
    const modulos = await modulosService.findAll();
    res.status(200).json(modulos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar modulos: " + error.message });
  }
};

export const getModulos = async (req, res) => {
  try {
    const { id } = req.params;
    const modulos = await modulosService.findOne(id);
    if (!modulos) {
      return res.status(404).json({ error: "Modulo não encontrado" });
    }
    res.status(200).json(modulos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar modulos: " + error.message });
  }
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
;