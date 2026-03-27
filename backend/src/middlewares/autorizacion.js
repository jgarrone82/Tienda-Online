const jwt = require('jsonwebtoken');

function verificaAutorizacion(peticion,respuesta,next){    
    if (!peticion.headers.autorizacion){
        return respuesta.status(403).send({resultado: "Acceso Denegado"})
    }

    const token = peticion.headers.autorizacion.split(" ")[1] 
    
    if (token === 'null') {
        return respuesta.status(403).send({resultado: "Acceso Denegado 2"})
    }

    const payload = jwt.decode(token, process.env.JWT_SECRET)
        
    peticion.usuarioId = payload._id    
    next()
}

module.exports = {verificaAutorizacion}       