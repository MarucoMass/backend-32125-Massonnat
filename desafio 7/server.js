const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ContenedorSQL = require('./src/contenedores/ContenedorSQL');
const config = require('./src/config');

// instancia de servidor y socket
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// instancia de api Contenedores
const productosApi = new ContenedorSQL(config.mariaDb, 'productos');
const mensajesApi = new ContenedorSQL(config.sqlite, 'mensajes');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

//seteo el motor de plantillas
app.set('view engine', 'ejs');

// Ruta
app.get('/', (req, res) => {
  res.render('pages/main');
});

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!');

  socket.emit('productos', await productosApi.listarAll())
	socket.emit('mensajes', await mensajesApi.listarAll())


  socket.on('nuevoProducto', async data => {
    await productosApi.guardar(data)
    const productos = await productosApi.listarAll()
    io.sockets.emit('productos', productos)
  })
  socket.on('nuevoMensaje', async data => {
    await mensajesApi.guardar(data)
    const mensajes = await mensajesApi.listarAll()
    io.sockets.emit('mensajes', mensajes)
  })
  
});


// servidor //
const PORT = 8080 || process.env.PORT;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);