const Api = require('../apis/apiProductos');
const api = new Api()

const validationId = (req, res, next) => {
    const id = req.params.id;
    if (id < 0 || id > api.traerTodo().length) {
        res.status(400).send({
            error : 'producto no encontrado' 
        })
    } else {
        next()
    }
}

module.exports = validationId;