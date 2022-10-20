import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        return this.knex.from(this.tabla).where('id', id).select('*');
    }

    async listarAll() {
        return this.knex(`${this.tabla}`).select('*');
    }

    async guardar(elem) {
        return await this.knex(this.tabla).insert(elem);
    }

    async actualizar(elem, id) {
        return this.knex.update(elem).where('id', id)
    }

    async borrar(id) {
        return this.knex.from(this.tabla).where('id', id).del();
    }

    async borrarAll() {
        return this.knex.from(this.tabla).del();
    }

    async desconectar() {
        this.knex.close();
    }
}

export default ContenedorSQL;