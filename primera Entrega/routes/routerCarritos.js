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
// routerCarritos.delete('/:id', (req, res) => {
//     res.json('hola')
// })
// routerCarritos.get('/:id/productos', (req, res) => {
//     res.json('hola')
// })
// routerCarritos.post('/:id/productos', (req, res) => {
//     res.json('hola')
// })
// routerCarritos.delete('/:id/productos/:id_prod', (req, res) => {
//     res.json('hola')
// })

module.exports = routerCarritos;