import knex from 'knex'
import config from '../src/config.js'

// async function tablaProductos() {
    const mariaDbClient = knex(config.mariaDb)
    try {
        await mariaDbClient.schema.dropTableIfExists('productos')
        await mariaDbClient.schema.createTable('productos', table => {
                table.increments('id').primary()
                table.string('title').notNullable()
                table.float('price')
                table.string('thumbnail')
         })
    
        console.log('tabla productos en mariaDb creada con éxito')
    } catch (error) {
        console.log('error al crear tabla productos en mariaDb')
        console.log(error)
    } finally {
        await mariaDbClient.destroy()
    }
// }


// async function tablaMensajes() {
    const sqliteClient = knex(config.sqlite3)
    try {
        await sqliteClient.schema.dropTableIfExists('mensajes')
        await sqliteClient.schema.createTable('mensajes', table => {
                table.increments('id').primary()
                table.string('author').notNullable()
                table.timestamp('date').defaultTo(sqliteKnex.fn.now());
                table.string('text')
        })
    
        console.log('tabla mensajes en sqlite3 creada con éxito')
    } catch (error) {
        console.log('error al crear tabla mensajes en sqlite3')
    } finally {
        await sqliteClient.destroy()
    }
// }

// tablaProductos();
// tablaMensajes();
