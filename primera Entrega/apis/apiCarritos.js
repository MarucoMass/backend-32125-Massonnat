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
            const carritoEncontrado = array.find(elem => elem.id === id)

            const stringifyCarrito = JSON.stringify(arrayFiltrado, null, 3);
            await fs.promises.writeFile(this.routeFile, stringifyCarrito);

            const booleano = carritoEncontrado ? arrayFiltrado : { error : 'el ID que buscas no se encuentra en este arreglo' }
            return booleano;
        } catch (error) {
            console.log(`Error al borrar el carrito: ${error}`)
            return error;
        }
    }

    async listarCarrito(id){
        try {
            const array = await this.traerTodo()
            const carritoEncontrado = array.find(elem => elem.id === id);

            const booleano = carritoEncontrado ? carritoEncontrado.productos : { error : 'el ID que buscas no se encuentra en este arreglo' }
            return booleano;
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
          
            const stringifyCarrito = JSON.stringify(array, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyCarrito)
            
            const booleano = carritoEncontrado && producto ? carritoEncontrado.productos : { error : 'el/los ID/s que buscas no se encuentra en este arreglo' }
            return booleano;
        } catch (error) {
            console.log(`Error al agregar al carrito: ${error}`)
            return error;
        }
    }

    async borrarCarritoYProducto(id, id_prod){
        try {
            const array = await this.traerTodo()
            const carritoFiltrado = array.find(elem => elem.id === id);
            const productoBorrado = carritoFiltrado.productos.find(elem => elem.id === id_prod);
            const producto = carritoFiltrado.productos.filter(elem => elem.id !== id_prod);
           
            carritoFiltrado.productos = '';
            carritoFiltrado.productos = producto;

            const stringifyCarrito = JSON.stringify(array, null, 3)
            await fs.promises.writeFile(this.routeFile, stringifyCarrito)

            const booleano = carritoFiltrado && productoBorrado ? carritoFiltrado.productos : { error : 'el/los ID/s que buscas no se encuentra en este arreglo' }
            return booleano;
        } catch (error) {
            console.log(`Error al borrar el carrito y el producto: ${error}`)
            return error;
        }
    }
}

module.exports = ApiCarrito;