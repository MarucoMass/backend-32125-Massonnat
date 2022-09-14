// TERCER DESAFIO
const express = require ('express');
const app = express()
const PORT  = 8080

const Contenedor = require ('../desafio 2/desafio2')
const producto = new Contenedor('./productos.txt');


// Servidor
const server = app.listen(PORT, () => {
    console.log(
        `Servidor Http escuchando en el puerto ${server.address().port}`
        );
    })
    
app.get('/productos', async (req, res) => {
    try {

        const productos = await producto.getAll()
        res.send(productos)
        
    } catch (error) {
        
        res.send(error)

    }
})

app.get('/productoRandom', async (req, res) => {
    try {

        const productos = await producto.getAll()

        const index = Math.floor(Math.random() * productos.length)

        res.send(productos[index])
        
    } catch (error) {
        
        res.send(error)

    }

    // const randomNumber = Math.ceil(Math.random() * producto.getAll().length)
    // const productRandom = producto.getAll().find(item => item.id === randomNumber)
    // res.send(productRandom);
})
