import React from 'react';
import { useNavigate } from 'react-router-dom';

const VistaPrevia = (props) => {
  const navigate = useNavigate();
  const { nombreProducto, imagenUrl, cantidadDisponible, precioUnitario } = props.producto;
  return (
    <div className="vistaContenedor">
      <h1 className="vistaTitulo">{nombreProducto}</h1>
      <div className="vistaTarjeta">
        <div className="fotografia">
          <img
            src={new URL('../assets/img/' + imagenUrl, import.meta.url).href}
            className="imgVista"
            alt="VistaProducto"
          />
        </div>
        <div className="descripcion">
          <h2>
            Precio:{' '}
            <span>
              {precioUnitario.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </h2>
          <h3>
            Unidades Disponibles: <span>{cantidadDisponible}</span>
          </h3>
        </div>
      </div>
      <button onClick={() => navigate('/main')} className="boton-primario">
        Atrás
      </button>
    </div>
  );
};

export default VistaPrevia;
