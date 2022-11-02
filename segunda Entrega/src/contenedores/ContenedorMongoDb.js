import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            return await this.coleccion.find({ _id: id })
        } catch (error) {
            console.log(error)
        }
    }

    async listarAll() {
        try {
            return await this.coleccion.find()
        } catch (error) {
            console.log(error)
        }
    }

    async guardar(nuevoElem) {
        try {
            return await this.coleccion.create(nuevoElem)
        } catch (error) {
            console.log(error)
        }
    }

    async actualizar(id, nuevoElem) {
        try {
            return await this.coleccion.find({ _id: id }, { $set: nuevoElem })
        } catch (error) {
            console.log(error)
        }
    }

    async borrar(id) {
        try {
            return await this.coleccion.deleteOne(id)
        } catch (error) {
            console.log(error)
        }
    }

    async borrarAll() {
        try {
            return await this.coleccion.deleteMany()
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContenedorMongoDb