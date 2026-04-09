import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoCarrito from './ProductoCarrito';

const Carrito = (props) => {
  const navigate = useNavigate();

  return (
    <div className="carritoContenedor">
      <h1 className="carritoTitulo">Carrito de compras</h1>
      <div className="compra">
        <div className="carritoProductos">
          <ProductoCarrito productosCarrito={props.productosCarrito} />
        </div>

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
      </div>
    </div>
  );
};

export default Carrito;
