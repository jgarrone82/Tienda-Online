import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const StyledCard = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  margin: '10px 7px',
  width: '260px',
  border: '1px solid rgb(199, 198, 198)',
  borderRadius: '7px',
  boxShadow: '1px 1px 5px #b8b8b8',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: '10px 0',
  },
  '& img': {
    width: '100%',
    height: '200px',
    borderRadius: '7px 7px 0px 0px',
  },
}));

const Descripcion = styled('div')({
  padding: '10px 10px 15px 10px',
});

const ProductoTitulo = styled('h1')({
  fontSize: 'x-large',
  textTransform: 'capitalize',
});

const CatalogoTexto = styled('p')({
  fontSize: 'medium',
  fontWeight: 'normal',
});

const CardOpciones = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '30px',
});

const InputFlecha = styled('input')({
  textAlign: 'center',
  lineHeight: '30px',
  width: '50px',
  marginLeft: '5px',
  borderRadius: '7px',
  border: 'solid gray thin',
});

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
    <StyledCard key={idProducto}>
      <img src={new URL('../assets/img/' + imagenUrl, import.meta.url).href} alt="Producto" />
      <Descripcion>
        <ProductoTitulo>{nombreProducto}</ProductoTitulo>
        <CatalogoTexto>
          <strong>Precio: </strong>
          {precioUnitario.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </CatalogoTexto>
        <CatalogoTexto>
          <strong>Unidades disponibles: </strong>
          {cantidadDisponible}
        </CatalogoTexto>
        <CardOpciones>
          <button onClick={handleVerMas} className="boton-secundario">
            Ver más
          </button>
          <div>
            <button onClick={handleAgregar} className="boton-primario">
              Añadir
            </button>
            <InputFlecha
              type="number"
              name="cantidadCarrito"
              min="1"
              max="10"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
        </CardOpciones>
      </Descripcion>
    </StyledCard>
  );
}

export default ProductoCard;
