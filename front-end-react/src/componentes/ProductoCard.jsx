import React, { useState } from 'react';

function ProductoCard(props) {
  const [cantidad, setCantidad] = useState('1');

  const handleVerMas = () => {
    props.toggleVista(props);
  };

  const handleAgregar = () => {
    const producto = {
      idProducto: props.idProducto,
      nombreProducto: props.nombreProducto,
      cantidadCarrito: parseInt(cantidad),
    };
    props.agregarProducto(producto);
  };

  const { idProducto, nombreProducto, imagenUrl, cantidadDisponible, precioUnitario } = props;

  return (
    <div className="producto-card" key={idProducto}>
      <img src={new URL('../assets/img/' + imagenUrl, import.meta.url).href} alt="Producto" />
      <div className="descripcion">
        <h1 className="productoTitulo">{nombreProducto}</h1>
        <p className="catalogoTexto">
          <strong>Precio: </strong>
          {precioUnitario.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </p>
        <p className="catalogoTexto">
          <strong>Unidades disponibles: </strong>
          {cantidadDisponible}
        </p>
        <div className="card-opciones">
          <button onClick={handleVerMas} className="boton-secundario">
            Ver más
          </button>
          <div>
            <button onClick={handleAgregar} className="boton-primario">
              Añadir
            </button>
            <input
              type="number"
              name="cantidadCarrito"
              min="1"
              max="10"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="inputFlecha"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
