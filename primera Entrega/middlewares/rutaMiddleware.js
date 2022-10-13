const validationRuta = (req, res, next) => {
    const ruta = req.baseUrl
    if (!ruta) {
        return res.status(400).send({
            error: -2,
            descripción: `ruta ${req.baseUrl} | método ${req.method} no implementada`,
          });
    } else {
        next()
    }
}

module.exports = validationRuta;