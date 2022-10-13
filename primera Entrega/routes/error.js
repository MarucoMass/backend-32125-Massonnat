const express = require('express')
const routerError = express.Router()

routerError.all('/', (req, res) => {
    res.json({
        error: -2,
        descripción: `ruta ${req.baseUrl} | método ${req.method} no implementado`
    })
})

module.exports = routerError;