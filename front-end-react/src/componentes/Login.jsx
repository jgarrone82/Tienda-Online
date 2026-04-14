import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login(props) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [campos, setCampos] = useState({});

  const objetoPeticion = (metodo, datos) => {
    return {
      method: metodo,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: '',
        Host: '',
      },
      body: JSON.stringify(datos),
    };
  };

  const handleFormulario = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/login`, objetoPeticion('POST', campos));
      let json = await respuesta.json();

      if (json.resultado === 'Autorizado') {
        localStorage.setItem('token', json.token);
        enqueueSnackbar(json.msg, { variant: 'success' });
        navigate('/main');
      } else {
        enqueueSnackbar(json.msg, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error al intentar iniciar sesión', { variant: 'error' });
    }
  };

  const handleCampos = (e) => {
    setCampos((prevCampos) => ({
      ...prevCampos,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetch(`${API_URL}/api/catalogo/inventarioInicial`, objetoPeticion('GET'))
      .then((respuesta) => respuesta.json())
      .catch(() => {});
  }, []);

  return (
    <div className="fondo">
      <div className="fondo2">
        <form className="formulario" onSubmit={handleFormulario}>
          <h1 className="texto1">Iniciar sesión</h1>

          <label>Correo electrónico:</label>
          <input
            type="text"
            name="email"
            onChange={handleCampos}
            className="inputInicio"
            autoFocus
            required
          />

          <label>Digite contraseña:</label>
          <div className="contrasena-box">
            <input
              type="password"
              name="pass"
              onChange={handleCampos}
              className="inputInicio"
              required
            />
          </div>

          <button type="submit" className="boton-inicio">
            Ingresar
          </button>
          <Link to="signin" className="texto1">
            Eres nuevo? &nbsp;&nbsp;&nbsp;
            <strong className="texto2 cursor">Registrate primero!</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
