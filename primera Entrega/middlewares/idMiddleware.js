const Api = require('../apis/apiProductos');
const api = new Api()

const validationId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id > api.traerTodo().length || api.obtenerPorId(id) === undefined) {
        console.log('erroorrrrrr')
        return res.status(400).send({
            error : 'el ID que buscas no se encuentra en este arreglo' 
        })
    } else {
        next()
    }
}

module.exports = validationId;