import express from 'express'
const { Router } = express

import {
    productosDao as productosApi,
    carritosDao as carritosApi
} from './daos/index.js'

//------------------------------------------------------------------------
// instancio servidor

const app = express()

//--------------------------------------------
// permisos de administrador

const IS_ADMIN = true;

const soloAdmins = (req, res, next) => {

  if (!IS_ADMIN) {
  return res.status(400).send({
      error: -1,
      descripción: `ruta ${req.baseUrl} | método ${req.method} no autorizada`,
    });
  } else {
    next();
  }
};

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
      try {
        const productos = await productosApi.listarAll()
        res.json(productos)
      } catch (error) {
        console.log(error)
        return error
      }
})

productosRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const productoListado = await productosApi.listar(id)
    res.json(productoListado)
  } catch (error) {
    console.log(error)
    return error
  }
})

productosRouter.post('/', soloAdmins, async (req, res) => {
  try {
    const body = {
      ...req.body
    }
    const productoGuardado = await productosApi.guardar(body)
    res.json(productoGuardado)
  } catch (error) {
    console.log(error)
    return error
  }
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const body = {
      ...req.body
    }
    await productosApi.actualizar(id, body)
    res.json('Actualizado')
  } catch (error) {
    console.log(error)
    return error
  }
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await productosApi.borrar(id)
    res.json('Borrado')
  } catch (error) {
    console.log(error)
    return error
  }
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
  try {
    const carrito = await carritosApi.listarAll()
    res.json(carrito)
  } catch (error) {
    console.log(error)
    return error
  }
})

carritosRouter.post('/', async (req, res) => {
  try {
    const carritoGuardado = await carritosApi.guardar()
    res.json(carritoGuardado)
  } catch (error) {
    console.log(error)
    return error
  }
})

carritosRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await carritosApi.borrar(id)
    res.json('Borrado')
  } catch (error) {
    console.log(error)
    return error
  }
})

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get('/:id/productos', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const carrito = await carritosApi.listar(id);
    res.json(carrito)
} catch (error) {
    res.json(error);
}
})

carritosRouter.post('/:id/productos', async (req, res) => {
  try {
    const body = {
      ...req.body
    }
    const carritoProdGuardado = await carritosApi.guardar(body)
    res.json(carritoProdGuardado)
  } catch (error) {
    console.log(error)
    return error
  }
})

carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carrito = await carritosApi.delete(id, id_prod);
    res.json('Borrado');
} catch (error) {
    res.json(error)
}
})

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

// servidor //
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))