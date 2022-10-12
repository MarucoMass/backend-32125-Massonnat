const Api = require('../apis/apiProductos');
const fs = require('fs');

const api = new Api('./fileSystem/productos.txt')
class ApiCarrito {
    constructor(routeFile){
        this.routeFile = routeFile
    }

    async traerTodo(){
        try {
            const array = await fs.promises.readFile(this.routeFile);
    
            const arrayParseado = JSON.parse(array);
    
            return arrayParseado;
        } catch (error) {
            const array = []

            return array
        }
    }

    async crearCarrito(){
        try {
            const array = await this.traerTodo()
            const carrito = {
                timestamp: new Date().toLocaleString(),
                productos: [],
                id: array.length === 0 ? 1 : array[array.length - 1].id + 1
            }
            array.push(carrito);

            const stringifyCarrito = JSON.stringify(array, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyCarrito)

            return carrito.id;
        } catch (error) {
            console.log(`Error al crear el carrito: ${error}`)
            return error;
        }
    }

    async borrarCarrito(id){
        try {
            const array = await this.traerTodo()
            const arrayFiltrado = array.filter(elem => elem.id !== id);
            const stringifyCarrito = JSON.stringify(arrayFiltrado, null, 3);
            await fs.promises.writeFile(this.routeFile, stringifyCarrito);
            return arrayFiltrado;
        } catch (error) {
            console.log(`Error al borrar el carrito: ${error}`)
            return error;
        }
    }

    async listarCarrito(id){
        try {
            const array = await this.traerTodo()
            const carritoEncontrado = array.find(elem => elem.id === id);
            console.log(carritoEncontrado.productos)
            return carritoEncontrado.productos;
        } catch (error) {
            console.log(`Error al listar los productos del carrito: ${error}`)
            return error;
        }
    }

    async guardarProducto(id, idProducto){
        try {
            const array = await this.traerTodo()
            const carritoEncontrado = array.find(elem => elem.id === id);

            const arrayProductos = await api.traerTodo();
            const producto = arrayProductos.find(elem => elem.id === idProducto)

            carritoEncontrado.productos.push(producto);
            // array.push(carritoEncontrado)
            const stringifyCarrito = JSON.stringify(array, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyCarrito)

            return carritoEncontrado.productos;
        } catch (error) {
            console.log(`Error al agregar al carrito: ${error}`)
            return error;
        }
    }

    async borrarCarritoYProducto(id, idProducto){
        try {
            const array = await this.traerTodo()
            const carritoFiltrado = array.find(elem => elem.id === id);
            const producto = carritoFiltrado.productos.filter(elem => elem.id !== idProducto);

            carritoFiltrado.productos.push(producto)
            array.push(carritoFiltrado);
            const stringifyCarrito = JSON.stringify(arrayParseado, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyCarrito)
            
            return producto;

        } catch (error) {
            console.log(`Error al borrar el carrito y el producto: ${error}`)
            return error;
        }
    }
}

module.exports = ApiCarrito;