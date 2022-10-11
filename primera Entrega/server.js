const express = require('express');
const path= require('path');
const fs = require('fs')
const routerProductos = require('./routes/routerProductos');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))


app.use("/api/productos", routerProductos);
// app.use("/api/carrito", routerCarrito);







// servidor //
const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))