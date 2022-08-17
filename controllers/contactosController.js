
import fs from "fs";

export const obternerContactos = (req, res) => {
    //lee el archivo ejemplo que es un txt y lo pasa a un array 
    let info = [];
        fs.readFile('ejemplo.js', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        info = JSON.parse(data);

        if( info.length < 1 ){
            return res.status(400).json({
                ok: false,
                msg: "No existen contactos"
            });
        }
    
        try {
            res.json({
                contactos: info.sort((a, b) => a.name.localeCompare(b.name))
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Contacte con un Administrador"
            })
        }
    });

}

export const obtenerContactoId = (req, res) => {

    const contactid  = req.params.contactid; 


        let info = [];

    fs.readFile('ejemplo.js', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        info = JSON.parse(data);

        const contacto =  info.filter( item => item.id === contactid );

        if( contacto.length < 1 ){
            return res.status(400).json({
                ok: false,
                msg: "No existe el contacto especificado"
            });
        }

        try {
            res.json(contacto);
        } catch (error) {
            res.status.json({
                ok: false,
                msg: "Contacte con un administrador"
            });
        }
    });

}

export const eliminarContacto = (req, res) => {
    const id = req.params.contactid;
    let info = [];

    fs.readFile('ejemplo.js', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        info = JSON.parse(data);
        const contacto =  info.filter( item => item.id === id );
        
        if(contacto.length < 1){
            return res.status(404).json({
                msg: "Contacto no encontrado"
            });
        }

        //Si existe el usuario lo eliminamos 
        const eliminado = info.filter( item => item.id != id);
        
        fs.writeFile("ejemplo.js", JSON.stringify(eliminado), function(err) {
            if(err){
                return console.log(err);
            }
        })
    
        res.json({
            ok: true,
            msg: "Usuario eliminado correctamente"
        });
    });







}