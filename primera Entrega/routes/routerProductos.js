const express = require('express');
const routerProductos = express.Router();
const Api = require('../apis/apiProductos');
const validationId = require('../middlewares/idMiddleware');
const validationAdmin = require('../middlewares/adminMiddleware');

const api = new Api('./fileSystem/productos.txt')

routerProductos.get('/', async (req, res) => {
    try {
        const productos = await api.getAll()
        res.json(productos);
    } catch (error) {
        res.json(error);
    }
  
});

routerProductos.get('/:id', validationId, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const producto = await api.getById(id)
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
        const productoAgregado = await api.addProduct(producto)
        res.json(productoAgregado);
    } catch (error) { 
        res.json(error);
    }
    
});

routerProductos.put('/:id', validationId, validationAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const nuevoProducto = await {
        ...req.body
        };
        const productoModificado = await api.updateProduct(nuevoProducto, id )
        res.json(productoModificado)
    } catch (error) {
        res.json(error);
    }
    
 });

routerProductos.delete('/:id', validationId, validationAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productoBorrado = await api.deleteProduct(id)
        res.json(productoBorrado)
    } catch (error) {
        res.json(error);
    }
   
});

module.exports = routerProductos;