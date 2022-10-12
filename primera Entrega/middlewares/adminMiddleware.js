const IS_ADMIN = true;

const isAdmin = (req, res, next) => {
  if (!IS_ADMIN) {
  res.status(400).send({
      error: 'Error 403',
      descripcion: `ruta ${req.baseUrl} | método ${req.method} no autorizado`,
    });
  }
  next();
};

module.exports = isAdmin;