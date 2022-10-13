const express = require('express');
const routerProductos = express.Router();

// controlador
const Api = require('../apis/apiProductos');
const api = new Api('./fileSystem/productos.txt')

// middlewares
const validationAdmin = require('../middlewares/adminMiddleware');

// Rutas
routerProductos.get('/', async (req, res) => {
    try {
        const productos = await api.traerTodo()
        res.json(productos);
    } catch (error) {
        res.json(error);
    }
  
});

routerProductos.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const producto = await api.obtenerPorId(id)
        res.json(producto);
    } catch (error) {
        res.json(error);
    }
    
});

routerProductos.post('/', async (req, res) => {
    try {
        const producto = {
            ...req.body
        };
        const productoAgregado = await api.agregar(producto)
        res.json(productoAgregado);
    } catch (error) { 
        res.json(error);
    }
    
});

routerProductos.put('/:id', validationAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const nuevoProducto = await {
        ...req.body
        };
        const productoModificado = await api.actualizar(nuevoProducto, id )
        res.json(productoModificado)
    } catch (error) {
        res.json(error);
    }
    
 });

routerProductos.delete('/:id', validationAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productoBorrado = await api.borrarPorId(id)
        res.json(productoBorrado)
    } catch (error) {
        res.json(error);
    }
   
});

module.exports = routerProductos;