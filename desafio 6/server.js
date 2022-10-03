const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require('fs')

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
//seteo el motor de plantillas
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/main");
});

const mensajes = [];
const arrayProductos = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  /* Envio los mensajes al cliente que se conectó */
  socket.emit("mensajes", mensajes);
  socket.emit("productos", arrayProductos);


  socket.on("nuevoMensaje", mensaje =>{
    mensajes.push(mensaje);
    io.sockets.emit("mensajes", mensajes);
    
    const stringifyElements = JSON.stringify(mensajes, null, 3)
    fs.promises.writeFile("./mensajes.txt", stringifyElements)

  })

  socket.on("nuevoProducto", producto =>{
    arrayProductos.push(producto);
    io.sockets.emit('productos', arrayProductos);
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
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);