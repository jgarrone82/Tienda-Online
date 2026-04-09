import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signin(props) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const navigate = useNavigate();
  const [campos, setCampos] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [mensajeTipo, setMensajeTipo] = useState('');

  const handleCampos = (e) => {
    setCampos((prevCampos) => ({
      ...prevCampos,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormulario = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const peticion = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos),
      };
      const respuesta = await fetch(`${API_URL}/API/nuevoUsuario`, peticion);
      let json = await respuesta.json();

      if (json.resultado === 'SI') {
        setMensaje(json.msg);
        setMensajeTipo('exito');
        navigate('/login');
      } else {
        setMensaje(json.msg);
        setMensajeTipo('error');
      }
    } catch (error) {
      setMensaje('Error al intentar registrarse');
      setMensajeTipo('error');
    }
  };

  return (
    <div className="fondo">
      <div className="fondo2">
        <form className="formulario" onSubmit={handleFormulario}>
          <h1 className="texto1">Registrate!</h1>

          {mensaje && (
            <p className={mensajeTipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>{mensaje}</p>
          )}

          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              onChange={handleCampos}
              className="inputInicio"
              placeholder=" Digita nombre completo"
              autoFocus
              required
            />
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input
              type="text"
              name="correo"
              onChange={handleCampos}
              className="inputInicio"
              placeholder=" ejemplo@hotmail.com"
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="contrasena1"
              onChange={handleCampos}
              className="inputInicio"
              placeholder=" Digita contrasena"
              required
            />
          </div>
          <div>
            <label>Confirma Contraseña:</label>
            <input
              type="password"
              name="contrasena2"
              onChange={handleCampos}
              className="inputInicio"
              placeholder=" Confirma tu contrasena"
              required
            />
          </div>

          <button type="submit" className="boton-inicio">
            Confirmar Registro
          </button>

          <Link to="login">
            <strong className="texto2 cursor">Inicia sesión</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;
