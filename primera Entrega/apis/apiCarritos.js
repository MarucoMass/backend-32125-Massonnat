const Api = require('../apis/apiProductos');
const fs = require('fs');

const api = new Api('./fileSystem/productos.txt')
class ApiCarrito {
    constructor(routeFile){
        this.routeFile = routeFile
    }

    arrayCarrito = []

    async crearCarrito(){
        try {
            const carrito = {
                id: this.arrayCarrito.length === 0 ? 1 : this.arrayCarrito[this.arrayCarrito.length - 1].id + 1,
                timestamp: Date.now(),
                productos: []
            }
            this.arrayCarrito.push(carrito);

            const stringifyCarrito = JSON.stringify(this.arrayCarrito, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyCarrito)

            return carrito;
        } catch (error) {
            return this.arrayCarrito
        }
      
    }
}

module.exports = ApiCarrito;