export class Perfil {
    constructor({ id, id_usuario, nome_completo, sexo, data_nascimento, endereco, numero,
        complemento, bairro, cidade, cep, pais,
    }) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.nome_completo = nome_completo;
        this.sexo = sexo;
        this.data_nascimento = data_nascimento;
        this.endereco = endereco;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.pais = pais;

    }

    static validate(perfil) {
        if (!perfil.nome_completo || !perfil.data_nascimento) {
            throw new Error("Nome completo e data de nascimento são obrigatórios!");
        }
    }
}