const express = require('express');
const routerCarritos = express.Router();
const ApiCarrito = require('../apis/apiCarritos')

const api = new ApiCarrito('./fileSystem/carrito.txt')

routerCarritos.post('/', async (req, res) => {
    try {
        const carrito = await api.crearCarrito();
        res.json(carrito);
    } catch (error) {
        res.json(error)
    }
})
routerCarritos.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const carrito = await api.borrarCarrito(id)
        res.json(carrito)
    } catch (error) {
        res.json(error)
    }
})
routerCarritos.get('/:id/productos', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const carrito = await api.listarCarrito(id);
        res.json(carrito)
    } catch (error) {
        res.json(error);
    }
})
routerCarritos.post('/:id/productos', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const body = req.body.id_prod;
        const carrito = await api.guardarProducto(id, body);
        res.json(carrito);
    } catch (error) {
        res.json(error);
    }
})
routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        const {id, id_prod} = req.params;
        const carrito = await api.borrarCarritoYProducto(id, id_prod);
        res.json(carrito);
    } catch (error) {
        res.json(error)
    }
})

module.exports = routerCarritos;