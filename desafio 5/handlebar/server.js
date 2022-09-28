const express = require('express');
const handlebars = require('express-handlebars');
const Api = require('../../desafio 4/api')
// const router = require('./routes/productRoutes')

const api = new Api()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//seteamos el motor de plantillas
app.set('view engine', 'hbs');
app.set('views', './views');

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts/', //ruta a la plantilla principal
    partialsDir: __dirname + '/views/partials/' //ruta a los parciales
  })
);


// Rutas //
app.get('/', (req, res) => {
    res.render('main');
});

app.get('/productos', (req, res) => {
    let array = api.getAll()
    console.log(array)
    res.render('products', {array});
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