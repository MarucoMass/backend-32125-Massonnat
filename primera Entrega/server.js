const express = require('express');
const routerProductos = require('./routes/routerProductos');
const routerCarritos = require('./routes/routerCarritos');
const routerError = require('./routes/error');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarritos);
app.use("*", routerError);

// servidor //
const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))