import { Router } from 'express'
import ContenedorSQL from './src/contenedores/ContenedorSQL.js'
import config from './src/config.js'

const router = Router()
const api = new ContenedorSQL(config.mariaDb, 'productos');


// GET
router.get('/', async (req, res) => {
    try {
        let productos = await api.listarAll()
        res.json(productos)
    } catch (error) {
        console.log(`Error: ${error}`)
        return error;
    }
})

router.get('/:id', async (req, res) => {
	try {
        const id = parseInt(req.params.id)
        let producto = await api.listar(id) || 'No encontrado'
        res.json(producto)
    } catch (error) {
        console.log(`Error: ${error}`)
        return error;
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const producto = {
            ...req.body
        };
        const productoAgregado = await api.guardar(producto)
        res.json(productoAgregado);
    } catch (error) { 
        res.json(error);
    }
})

router.put('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const nuevoProducto = {
            ...req.body
        };
        const productoModificado = await api.actualizar(nuevoProducto, id )
        res.json(productoModificado)
    } catch (error) {
        res.json(error);
    }
})

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const productoBorrado = await api.borrar(id)
        res.json(productoBorrado)
    } catch (error) {
        res.json(error);
    }

})

export default router;