const IS_ADMIN = true;

const isAdmin = (req, res, next) => {

  if (!IS_ADMIN) {
  return res.status(400).send({
      error: -1,
      descripción: `ruta ${req.baseUrl} | método ${req.method} no autorizada`,
    });
  } else {
    next();
  }
};

module.exports = isAdmin;


// const admin = true;

// const crearAdmin = (ruta, metodo) => {
//   const error = {
//     error: -1
//   }
//   ruta && metodo ? error.descripción = `ruta ${req.baseUrl} | método ${req.method} no autorizada` : error.descripción = 'no autorizado'
//   return error
// }

// const isAdmin = (req, res, next) => {

//   !admin ? res.json(crearAdmin()) : next()

//   next();
// };

// module.exports = isAdmin;