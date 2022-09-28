const express = require('express');
const Api = require('../../desafio 4/api')

const api = new Api()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//seteamos el motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas //
app.get('/', (req, res) => {
    res.render('productForm');
});

app.get('/productos', (req, res) => {
    let array = api.getAll()
    console.log(array)
    res.render('productList', {array});
});

app.post('/productos', (req, res) => {
    let product = {
        ...req.body
    };
    api.addProduct(product)  
    console.log(req.body)
    res.redirect('/')
    });


// Servidor //
const PORT = 8080
const server = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${server.address().port}`)
    })
server.on('error', error => console.log(`Error en servidor ${error}`))