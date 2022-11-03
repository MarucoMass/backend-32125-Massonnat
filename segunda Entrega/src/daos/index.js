let productosDao
let carritosDao
let eleccionDB = "json"
switch (eleccionDB) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':
        
        break
    case 'mongodb':
        
        break
    case 'mariadb':
        
        break
    case 'sqlite3':
        
        break
    default:
        
        break
}

export { productosDao, carritosDao }