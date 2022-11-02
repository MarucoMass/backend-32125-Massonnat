export default {
    fileSystem: {
        path: './db'
    },
    mongodb: {
        cnxStr: 'mongodb://127.0.0.1:27017/ecommerce',
        options: {
            serverSelectionTimeoutMS: 5000
        }
    },
    firebase: { //Cambiar por la config personal
        path: 'segundaentregabackend-firebase-adminsdk-5pa53-8e9cf8dd97.json'
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './db/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'test'
        }
    }
}