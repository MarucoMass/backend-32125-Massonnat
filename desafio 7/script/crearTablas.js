const knex = require('knex');
const config = require('../src/config');

async function tablaProductos() {
    try {
        const mariaDbClient = await knex(config.mariaDb)
    
        mariaDbClient.schema.createTable('productos', table => {
                table.increments('id')
                table.string('title').notNullable()
                table.float('price').notNullable()
                table.string('thumbnail').notNullable()
         })
    
        console.log('tabla productos en mariaDb creada con éxito')
    } catch (error) {
        console.log('error al crear tabla productos en mariaDb')
        console.log(error)
    }
}


async function tablaMensajes() {
    try {
        const sqliteClient = await knex(config.sqlite)
    
        sqliteClient.schema.createTable('mensajes', table => {
            table.increments('id')
                table.string('email').notNullable()
                table.timestamp('hora').defaultTo(sqliteKnex.fn.now());
                table.string('mensaje').notNullable()
        })
    
        console.log('tabla mensajes en sqlite3 creada con éxito')
    } catch (error) {
        console.log('error al crear tabla mensajes en sqlite3')
    }
}

tablaProductos();
tablaMensajes();
