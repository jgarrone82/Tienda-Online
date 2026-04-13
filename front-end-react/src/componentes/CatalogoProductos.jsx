import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductoCard from './ProductoCard';

const BuscadorContainer = styled('div')({
  backgroundColor: '#F5F5F5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '80px',
  padding: '0px 30px',
  borderBottom: 'solid gray thin',
  position: 'fixed',
  width: '100%',
  maxWidth: '1200px',
  zIndex: 20,
  boxSizing: 'border-box',
});

const CatalogoContainer = styled('div')({
  padding: '90px 0px 10px 0px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

function CatalogoProductos(props) {
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const cargueProductos = async () => {
    try {
      setCargando(true);
      setError('');
      const respuesta = await fetch(URL + '/catalogo/cargueProductos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (err) {
      setError('Hubo un error al cargar productos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargueProductos();
  }, []);

  const handleBuscar = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const productosFiltro = productos.filter(
    (producto) => producto.nombreProducto.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1,
  );

  return (
    <div className="catalogoProductos">
      <BuscadorContainer>
        <div>
          <h1>Catálogo de productos</h1>
        </div>
        <div>
          <p>¿Qué estás buscando?</p>
          <input
            type="text"
            name="buscar"
            onChange={handleBuscar}
            className="catalogoInput"
            placeholder="Escribe..."
          />
        </div>
      </BuscadorContainer>
      <CatalogoContainer>
        {cargando && (
          <>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="producto-card" style={{ padding: '10px' }}>
                <Skeleton variant="rounded" width={240} height={200} />
                <div style={{ marginTop: '10px' }}>
                  <Skeleton variant="text" width={180} height={30} />
                  <Skeleton variant="text" width={150} height={20} />
                  <Skeleton variant="text" width={140} height={20} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}
                  >
                    <Skeleton variant="rounded" width={75} height={35} />
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <Skeleton variant="rounded" width={75} height={35} />
                      <Skeleton variant="rounded" width={50} height={35} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {error && <p>{error}</p>}

        {!cargando &&
          !error &&
          productosFiltro.map((producto) => {
            return (
              <ProductoCard
                key={producto.idProducto}
                idProducto={producto.idProducto}
                nombreProducto={producto.nombreProducto}
                imagenUrl={producto.imagenUrl}
                cantidadDisponible={producto.cantidadDisponible}
                precioUnitario={producto.precioUnitario}
                toggleVista={props.toggleVista}
                agregarProducto={props.agregarProducto}
              />
            );
          })}
      </CatalogoContainer>
    </div>
  );
}

export default CatalogoProductos;
