import { NotificacoesService } from "./service.js";

export const getAllNotificacoes = async (_, res) => {
    try {
        const perfis = await NotificacoesService.findAll();
        res.status(200).json(perfis);
    } catch (error) {
        res
            .status(500)
            .json({ error: "Erro ao buscar: " + error.message });
    }
};

export const getNotificacao = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = await NotificacoesService.findOne(id);
        if (!dados) {
            return res.status(404).json({ error: "Não encontrado" });
        }
        res.status(200).json(dados);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar: " + error.message });
    }
};

export const createNotificacao = async (req, res) => {
    try {
        const dados = req.body;
        await NotificacoesService.create(dados);
        res.status(201).json({ message: "Criado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar: " + error.message });
    }
};


export const updateNotificacao = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        await NotificacoesService.update(id, dados);
        res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Erro ao atualizar: " + error.message });
    }
};

export const patchNotificacao = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        await NotificacoesService.patch(id, dados);
        res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Erro ao atualizar: " + error.message });
    }
};

export const deleteNotificacao = async (req, res) => {
    try {
        const { id } = req.params;
        await NotificacoesService.remove(id);
        res.status(200).json({ message: "Removido com sucesso" });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Erro ao remover: " + error.message });
    }
};