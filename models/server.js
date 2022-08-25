import express from "express";
import cors from "cors";
import router from "../routes/contactosRoutes.js";

class Server{

    constructor(){
        
        this.app = express();

        this.app.set('trust proxy', true);

        this.urlApi = {
            contactos: "/contactos"
        }

        this.middlewares();

        this.routes();

    }

    routes(){
        this.app.use("/*", (req, res) => res.status(404).json());
        this.app.use(this.urlApi.contactos, router);
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //Lectura de body
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: false }));
        //Creando ruta statica de la app
        // 
    }

    listen(){
        this.app.listen(4000, "0.0.0.0", () => {
            console.log("Conectado en el puerto 4000");
        });
    }
}

export default Server;