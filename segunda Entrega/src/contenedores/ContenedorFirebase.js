import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase.path)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        const resultado = await this.collection.get().docs.map(doc => ({ 
            id: doc.id,
            data: doc.data()
          }))
        const item = resultado.find(elem => elem.id == id)
        return item
    }

    async listarAll() {
        const resultado = await this.collection.get()
        resultado = resultado.docs.map(doc => ({ 
          id: doc.id,
          data: doc.data()
        }))
        return resultado
    }

    async guardar(nuevoElem) {
        const item = await doc.create(nuevoElem)
        return item
    }

    async actualizar(id, nuevoElem) {
        const doc = this.collection.doc(`${id}`)
        const item = await doc.update(nuevoElem)
        return item
    }

    async borrar(id) {
        const doc = this.collection.doc(`${id}`).delete()
        return ({ status: 'borrado' })
    }

    async borrarAll() {
        const doc = this.collection.doc().delete()
        return ({ status: 'borrado' })
    }

    async desconectar() {
    }
}

export default ContenedorFirebase