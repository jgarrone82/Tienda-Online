import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ProductoCarrito from './ProductoCarrito';

const StyledCarritoContenedor = styled('div')({
  backgroundColor: 'white',
  height: '400px',
  padding: '0px 15px 0px 15px',
  borderRadius: '7px',
});

const StyledCompra = styled('div')({
  display: 'flex',
});

const StyledCarritoProductos = styled('div')({
  margin: '0px 50px 0px 20px',
  padding: '0px 10px 0px 10px',
  width: '400px',
  height: '280px',
  border: 'solid rgb(199, 198, 198) 1px',
  borderRadius: '5px',
  overflow: 'auto',
});

const Carrito = (props) => {
  const navigate = useNavigate();

  return (
    <StyledCarritoContenedor>
      <h1 className="carritoTitulo">Carrito de compras</h1>
      <StyledCompra>
        <StyledCarritoProductos>
          <ProductoCarrito productosCarrito={props.productosCarrito} />
        </StyledCarritoProductos>

        <div className="factura">
          <h2>
            Total:{' '}
            <span>
              {props.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </h2>
          <button onClick={() => navigate('/main')} className="boton-secundario">
            Volver
          </button>
          <button onClick={() => props.pagar()} className="boton-primario">
            Pagar
          </button>
        </div>
      </StyledCompra>
    </StyledCarritoContenedor>
  );
};

export default Carrito;
