const fs = require('fs');

class Api {
    constructor(routeFile){
        this.routeFile = routeFile
    }
    // productsArray = []
    
   async getAll() {
    try {
        const array = await fs.promises.readFile(this.routeFile);
    
        const arrayParseado = JSON.parse(array);

        return arrayParseado;
        
    } catch (error) {
        const array = []

        return array
    }
    }

   async addProduct(product) {
    try {
        const array = await this.getAll()
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

    async getById(id) {
        try {
            const array = await this.getAll()
            const productId = array.find(elem => elem.id === id)
            return productId
        } catch (error) {
            console.log(`Error: ${error}`)
            return error
        }
    }

    async updateProduct(newProduct, id ) {
        try {
            const array = await this.getAll()
            const productoEncontrado = array.find(elem => elem.id === id)
            productoEncontrado.timestamp = Date.now();
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

    async deleteProduct(id) {
        try {
            const arraySinBorrar = await this.getAll();
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