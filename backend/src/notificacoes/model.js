export class Notificacoes {
    constructor({id,titulo,mensagem,tipo }) {
        this.id = id;
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.tipo = tipo;
    }

    static validate(dado) {
        if (! dado.titulo && !dado.tipo) {
            throw new Error("São obrigatórios!");
        }
    }
}