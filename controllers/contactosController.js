import fs from "fs";

export const obternerContactos = (req, res) => {
    //lee el archivo ejemplo que es un txt y lo pasa a un array 

    const { phrase } = req.body;

    if(!phrase && phrase !== undefined){
        return res.status(400).json();
    }
    
    //Si tiene la frase buscaremos algo que coincida con la frase

    let info = [];
        fs.readFile('ejemplo.js', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
      
        info = JSON.parse(data);

        if( info.length < 1 ){
            return res.status(404).json({
                ok: false,
                msg: "No existen contactos"
            });
        }
    
        try {
            res.json({
                contactos: phrase ? info.filter( a => a.name.toLowerCase().includes(phrase.toLowerCase()) && a )  : info.sort((a, b) => a.name.localeCompare(b.name))
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
            return res.status(404).json();
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

// export const eliminarContacto = (req, res) => {
//     const id = req.params.contactid;
//     let info = [];

//     fs.readFile('ejemplo.js', 'utf8', function(err, data) {
//         if (err) {
//           return console.log(err);
//         }
      
//         info = JSON.parse(data);
//         const contacto =  info.filter( item => item.id === id );
        
//         if(contacto.length < 1){
//             return res.status(404).json({
//                 msg: "Contacto no encontrado"
//             });
//         }

//         //Si existe el usuario lo eliminamos 
//         const eliminado = info.filter( item => item.id != id);
        
//         fs.writeFile("ejemplo.js", JSON.stringify(eliminado), function(err) {
//             if(err){
//                 return console.log(err);
//             }
//         })
    
//         res.json({
//             ok: true,
//             msg: "Usuario eliminado correctamente"
//         });
//     });
// }

export const crearContacto = async ( req, res ) => {
    
    const { id, name, phone, addressLines } = req.body;

    let a = {
        id, name, phone, addressLines: addressLines
    }

    let info = [];

    fs.readFile('ejemplo.js', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            info = JSON.parse(data);
            
            const contacto =  info.filter( item => item.id === id );

            if(contacto.length > 0){
                return res.status(404).json({
                    msg: "Contacto ya existe"
                });
            }

            //Si no existe el usuario lo agregamos
            info.push(a);
            
            fs.writeFile("ejemplo.js", JSON.stringify(info), function(err) {
                if(err){
                    return console.log(err);
                }
            })

            res.json({
                ok: true,
                msg: "Usuario agregado correctamente",
                contacto: a
            });
    });
}

//default
export const defaultRespuesta = (req, res) => {
    return res.status(405).json();
}