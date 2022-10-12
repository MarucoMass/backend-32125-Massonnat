const fs = require('fs');

class Api {
    constructor(routeFile){
        this.routeFile = routeFile
    }
    // productsArray = []
    
   async traerTodo() {
    try {
        const array = await fs.promises.readFile(this.routeFile);
    
        const arrayParseado = JSON.parse(array);

        return arrayParseado;
        
    } catch (error) {
        const array = []

        return array
    }
    }

   async agregar(product) {
    try {
        const array = await this.traerTodo()
        const id = array.length === 0 ? 1 : array[array.length - 1].id + 1
        product.id = id;
        product.timestamp = Date.now();
        array.push(product);
        
        const stringifyArray = JSON.stringify(array, null, 3)
        await fs.promises.writeFile(this.routeFile, stringifyArray)

        return product;
        
    } catch (error) {
        console.log(`Error al guardar: ${error}`)
        return error
    }
    }

    async obtenerPorId(id) {
        try {
            const array = await this.traerTodo()
            const productoId = array.find(elem => elem.id === id)
            return productoId
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
    }

    async actualizar(newProduct, id ) {
        try {
            const array = await this.traerTodo()
            const productoEncontrado = array.find(elem => elem.id === id)
            productoEncontrado.timestamp = new Date().toLocaleString();
            productoEncontrado.nombre = newProduct.nombre;
            productoEncontrado.descripcion = newProduct.descripcion;
            productoEncontrado.codigo = newProduct.codigo;
            productoEncontrado.foto = newProduct.foto;
            productoEncontrado.precio = newProduct.precio;
            productoEncontrado.stock = newProduct.stock;
            array.push(productoEncontrado)

            const stringifyArray = JSON.stringify(array, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyArray)

            return productoEncontrado;
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
    }

    async borrarPorId(id) {
        try {
            const arraySinBorrar = await this.traerTodo();
            const productoBorrado = array.find(elem => elem.id === id);
            const array = arraySinBorrar.filter(elem => elem.id !== id)

            const stringifyArray = JSON.stringify(array, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyArray)

            return productoBorrado;
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
       
    }

}

module.exports = Api;