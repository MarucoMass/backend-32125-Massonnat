import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        try {
            return await this.knex.from(this.tabla).where('id', id).select('*');
        } catch (error) {
            return { 'Error': error}
        }
    }

    async listarAll() {
        try {
            return await this.knex(`${this.tabla}`).select('*');
        } catch (error) {
            return { 'Error': error}
        }
    }

    async guardar(elem) {
        try {
            return await this.knex(this.tabla).insert(elem);
        } catch (error) {
            return { 'Error': error}
        }
    }

    async actualizar(elem, id) {
        try {
            return await this.knex.update(elem).where('id', id)
        } catch (error) {
            return { 'Error': error}
        }
    }

    async borrar(id) {
        try {
            return await this.knex.from(this.tabla).where('id', id).del();
        } catch (error) {
            return { 'Error': error}
        }
    }

    async borrarAll() {
        try {
            return await this.knex.from(this.tabla).del();
        } catch (error) {
            return { 'Error': error}
        }
    }

    async desconectar() {
        try {
           await this.knex.close();
        } catch (error) {
            return { 'Error': error}
        }
    }
}

export default ContenedorSQL;