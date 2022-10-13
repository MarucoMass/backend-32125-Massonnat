
const isAdmin = (req, res, next) => {
  const IS_ADMIN = true;

  if (!IS_ADMIN) {
  res.status(400).send({
      error: -1,
      descripción: `ruta ${req.baseUrl} | método ${req.method} no autorizada`,
    });
  }
  next();
};

module.exports = isAdmin;