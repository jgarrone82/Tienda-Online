import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledVistaContenedor = styled('div')({
  backgroundColor: 'white',
  padding: '0px 40px 20px 20px',
});

const StyledVistaTarjeta = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const StyledImgVista = styled('img')({
  marginRight: '50px',
  width: '330px',
  border: 'solid rgb(199, 198, 198)',
  borderWidth: 'thin',
  borderRadius: '10px',
});

const VistaPrevia = (props) => {
  const navigate = useNavigate();
  const { nombreProducto, imagenUrl, cantidadDisponible, precioUnitario } = props.producto;
  return (
    <StyledVistaContenedor>
      <h1 className="vistaTitulo">{nombreProducto}</h1>
      <StyledVistaTarjeta>
        <div className="fotografia">
          <StyledImgVista
            src={new URL('../assets/img/' + imagenUrl, import.meta.url).href}
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
      </StyledVistaTarjeta>
      <button onClick={() => navigate('/main')} className="boton-primario">
        Atrás
      </button>
    </StyledVistaContenedor>
  );
};

export default VistaPrevia;
