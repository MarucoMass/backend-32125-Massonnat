const express = require('express');
const Api = require('./api');

const app = express();
const api = new Api();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

const router = express.Router();
app.use('/api/productos', router)


/* -------------------------- */
/* Middleware */
let validationId = (req, res, next) => {
    const id = req.params.id;
    if (id < 0 || id > api.getAll().length) {
        res.status(400).send({
            error : 'producto no encontrado' 
        })
    } else {
        next()
    }
}

/* -------------------------- */
/* Rutas */

router.get ('/', (req, res) => {
    res.json(api.getAll());
}
)

router.get ('/:id', validationId, (req, res) => {
    const id = parseInt(req.params.id);
    res.json(api.getById(id));
}
)

router.post ('/', (req, res) => {
    const product = {
        ...req.body
    };
    api.addProduct(product)
    res.json(product);
}
)

router.put ('/:id', validationId, (req, res) => {
    const id = parseInt(req.params.id);
    const newProduct = {
        ...req.body
    }
    api.updateProduct(id, newProduct)
    res.json(api.getById(id))
}
)

router.delete ('/:id', validationId, (req, res) => {
    const id = parseInt(req.params.id);
    res.json(api.deleteProduct(id))
}
)

/* ------------------------- */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))