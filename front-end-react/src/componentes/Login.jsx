import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Login(props) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    const [campos, setCampos] = useState({})
    const [mensaje, setMensaje] = useState('')
    const [mensajeTipo, setMensajeTipo] = useState('')

    const objetoPeticion = (metodo,datos) => {
        return ({
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': ''
            },
            body: JSON.stringify(datos)
        })
    }

    const handleFormulario = async (e) => {
        e.preventDefault()
        setMensaje('')

        try {
            const respuesta = await fetch(`${API_URL}/API/login`,objetoPeticion("POST",campos))
            let json = await respuesta.json()

            if(json.resultado === "Autorizado")
            {
              localStorage.setItem('token',json.token)
              setMensaje(json.msg)
              setMensajeTipo('exito')
              props.history.push('/main')
            }else{
              setMensaje(json.msg)
              setMensajeTipo('error')
            }

        } catch (error) {
            setMensaje('Error al intentar iniciar sesión')
            setMensajeTipo('error')
        }

    }

    const handleCampos = (e) => {
        setCampos((prevCampos) => ({
            ...prevCampos,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        fetch(`${API_URL}/catalogo/inventarioInicial`,objetoPeticion("GET"))
        .then(respuesta => respuesta.json())
        .catch(() => {})
    }, [])

    return (
        <div className="fondo">
            <div className="fondo2">
                <form className="formulario" onSubmit={handleFormulario}>
                    <h1 className="texto1">Iniciar sesión</h1>

                    {mensaje && (
                        <p className={mensajeTipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>
                            {mensaje}
                        </p>
                    )}

                    <label>Correo electrónico:</label>
                    <input type="text" name="email" onChange={handleCampos} className="inputInicio" autoFocus required/>

                    <label>Digite contraseña:</label>
                    <div className="contrasena-box">
                        <input type="password" name="pass" onChange={handleCampos} className="inputInicio" required/>
                    </div>

                    <button type="submit" className="boton-inicio">Ingresar</button>
                    <Link to="signin" className="texto1">Eres nuevo? &nbsp;&nbsp;&nbsp;<strong className="texto2 cursor">Registrate primero!</strong></Link>
                </form>

            </div>
        </div>
    )
}


export default Login
