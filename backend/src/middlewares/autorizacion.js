const jwt = require('jsonwebtoken');

function verificaAutorizacion(peticion,respuesta,next){    
    if (!peticion.headers.autorizacion){
        return respuesta.status(403).send({resultado: "Acceso Denegado"})
    }

    const token = peticion.headers.autorizacion.split(" ")[1] 
    
    if (token === 'null') {
        return respuesta.status(403).send({resultado: "Acceso Denegado 2"})
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        peticion.usuarioId = payload._id    
        next()
    } catch (error) {
        return respuesta.status(401).send({resultado: "Acceso Denegado", msg: "Token inválido o expirado"})
    }
}

module.exports = {verificaAutorizacion}       