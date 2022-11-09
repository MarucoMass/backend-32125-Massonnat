import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async guardar() {
        return super.guardar()
    }
}

export default CarritosDaoMongoDb
