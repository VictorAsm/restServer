const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Coneccion a base de datos
        this.conectarDB();

        // Middlewares -> Funcion que siempre se ejecuta cuando levantamos el servidor
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') )
    }

    routes () {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        })
    }

}

module.exports = Server;