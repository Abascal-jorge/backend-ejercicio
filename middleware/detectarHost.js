
import fs from "fs";

const detectarHost = async (req, res, next) => {
    var idAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

    //validamos que no exista el id
    let info = [];

    fs.readFile('ejemplo.js', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
            
        info = JSON.parse(data);

        const contacto =  info.filter( item => item.id === req.body.id );

        if(contacto.length < 1){
            console.log(idAddress);
        }
    });
    return next();
}

export default detectarHost;