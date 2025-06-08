import { buscar_modulo_mais_acessado, buscar_modulo_menos_acessado, incrementar_acessos, repository_modulos } from "./repository.js";
import { Modulo } from "./model.js";

export const modulosService = {
  async create(dados) {
    Modulo.validate(dados);
    await repository_modulos.create(dados);
  },

  async findAll() {
    return await repository_modulos.findAll();
  },

  async findOne(id) {
    const modulos = await repository_modulos.findOne(id);
    if (!modulos) throw new Error("Módulo não encontrado");
    return modulos;
  },

  async update(id, dados) {
    Modulo.validate(dados);
    const modulosExistente = await repository_modulos.findOne(id);
    if (!modulosExistente) throw new Error("Módulo não encontrado");
    await repository_modulos.update(id, dados);
  },

  async patch(id, dados) {
    Modulo.validate(dados);
    const modulosExistente = await repository_modulos.findOne(id);
    if (!modulosExistente) throw new Error("Módulo não encontrado");
    await repository_modulos.patch(id, dados);
  },

  async remove(id) {
    const modulosExistente = await repository_modulos.findOne(id);
    if (!modulosExistente) throw new Error("Módulo não encontrado");
    await repository_modulos.remove(id);
  },
  async incrementar_acessos(id)  {   
    const modulo = await repository_modulos.findOne(id);
    if (!modulo) {
      throw new Error("Módulo não encontrado");
    }
    return await repository_modulos.incrementar_acessos(id);
  },
  async buscar_modulo_mais_acessado() {
    const modulo = await repository_modulos.buscar_modulo_mais_acessado();
    if (!modulo) {
      throw new Error("Módulo não encontrado");
    }
    return modulo;
  },
  async buscar_modulo_menos_acessado(){
    const modulo = await repository_modulos.buscar_modulo_menos_acessado();
    if (!modulo) {
      throw new Error("Módulo não encontrado");
    }
    return modulo;
  },
  async buscar_por_nome(nome) {
    return await repository_modulos.findByNome(nome);
  },

  async listar_modulos_paginado(pagina = 1, limite = 10, ordem = "asc") {
    return await repository_modulos.findAllPaginado(pagina, limite, ordem);
  },

  async contar_total_modulos() {
    return await repository_modulos.contarModulos();
  },
  async nome_existe(nome) {
    return await repository_modulos.nomeExiste(nome);
  },
  async resetar_acessos() {
    return await repository_modulos.resetarAcessos();
  },

  async buscar_ultimos_modulos(qtd = 5) {
    return await repository_modulos.buscarUltimosModulos(qtd);
  },

  async buscar_modulos_com_muitos_acessos(minimo = 10) {
    return await repository_modulos.buscarPorAcessosMinimos(minimo);
  },
  async porcentagem_de_acessos() {
  return await repository_modulos.calcularPorcentagemDeAcessos();
},
};