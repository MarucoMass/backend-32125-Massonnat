const express = require('express');
const routerProductos = express.Router();
const Api = require('../apis/apiProductos');
const validationId = require('../middlewares/idMiddleware');
const validationAdmin = require('../middlewares/adminMiddleware');

const api = new Api()

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
        const productos = await api.getById(id)
        res.json(productos);
    } catch (error) {
        res.json(error);
    }
    
});

routerProductos.post('/', async (req, res) => {
    try {
        const product = await {
            ...req.body
        };
        res.json(api.addProduct(product));
    } catch (error) { 
        res.json(error);
    }
    
});

routerProductos.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newProduct = {
        ...req.body
        };
        api.updateProduct(newProduct, id )
        res.json(api.getById(id))
    } catch (error) {
        res.json(error);
    }
    
 });

routerProductos.delete('/:id', validationId, async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        res.json(api.deleteProduct(id))
    } catch (error) {
        res.json(error);
    }
   
});

module.exports = routerProductos;