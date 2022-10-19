const config = {

    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'test'
        }
    },
    
   sqlite: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    }
    
}


module.exports = { config };