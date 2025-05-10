import { database } from "../../../knexfile";

const tabela = "Usuarios"

export const create = async (dados) => {
    await database(tabela).insert({
        
    })
}

export const findAll = async () => {
    return await database(tabela).select("*");
}

export const findOne = async (id) => {
    return await database(tabela).where({id:id}).first();
}

export const update = async (id,dados) => {
    await database(tabela).where({id:id}).update({
        
    })
}

export const remove = async (id) => {
    await database(tabela).where({id:id}).delete();
}

export const repository_usuarios = {
    create,findAll,findOne,update,remove
}