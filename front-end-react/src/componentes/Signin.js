import React from 'react'
import { Link } from 'react-router-dom'

class Signin extends React.Component{

    URL = 'http://localhost:4000'

    state = {}

    handleCampos = (e) => { 
        this.setState({     
            [e.target.name]: e.target.value 
         })
    }

    handleFormulario = async (e) => {
        e.preventDefault()
        console.log("signin: ",this.state) 
        
        try {
            const peticion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)             
            } 
            const respuesta = await fetch(`${this.URL}/API/nuevoUsuario`,peticion)
            let json = await respuesta.json()
            console.log(json)

            if(json.resultado === "SI") {                             
              alert(json.msg)
              this.props.history.push('/login')  
            }else{
              alert(json.msg)
            }

        } catch (error) {
            console.log("Hubo error al hacer login: ", error)
        }

    }

    render(){
        return(
            <div className="fondo">
                <div className="fondo2">
                    <form className="formulario" onSubmit={this.handleFormulario}>
                        <h1 className="texto1">Registrate!</h1>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="nombre" onChange={this.handleCampos} className="inputInicio" placeholder=" Digita nombre completo" autoFocus required/>
                        </div>
                        <div>
                            <label>Correo electrónico:</label>
                            <input type="text" name="correo" onChange={this.handleCampos} className="inputInicio" placeholder=" ejemplo@hotmail.com" required/>
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input type="password" name="contrasena1" onChange={this.handleCampos}  className="inputInicio" placeholder=" Digita contrasena" required/>
                        </div>
                        <div>
                            <label>Confirma Contraseña:</label>
                            <input type="password" name="contrasena2" onChange={this.handleCampos} className="inputInicio" placeholder=" Confirma tu contrasena" required/>
                        </div>
                            
                        <button type="submit" className="boton-inicio" onClick={this.handleFormulario}>Confirmar Registro</button>
                    
                        <Link to="login"><strong className="texto2 cursor">Inicia sesión</strong></Link>
                    </form>

                </div>
            </div>
        )
    }

}

export default Signin