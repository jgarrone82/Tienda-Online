import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Encabezado from './Encabezado';
import CatalogoProductos from './CatalogoProductos';
import VistaPrevia from './VistaPrevia';
import Carrito from './Carrito';

function Main(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const [token, setToken] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [producto, setProducto] = useState({});
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [carrito, setCarrito] = useState(0);
  const [total, setTotal] = useState(0);

  const objetoPeticion = (metodo, datos, tokenHeader = token) => {
    return {
      method: metodo,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenHeader}`,
        Origin: '',
        Host: '',
      },
      body: JSON.stringify(datos),
    };
  };

  const obtenerToken = () => {
    return localStorage.getItem('token') || 'null';
  };

  const cantidadProductos = async (tokenHeader = token) => {
    try {
      const respuesta = await fetch(
        `${API_URL}/api/catalogo/cantidadProductos`,
        objetoPeticion('GET', undefined, tokenHeader),
      );
      if (!respuesta.ok) {
        setCarrito(0);
        return;
      }
      const texto = await respuesta.text();
      const cantidad = texto ? parseInt(texto, 10) : 0;
      setCarrito(isNaN(cantidad) ? 0 : cantidad);
    } catch (error) {
      setCarrito(0);
    }
  };

  const muestraCarrito = async (tokenHeader = token) => {
    const respuesta = await fetch(
      `${API_URL}/api/catalogo/muestraCarrito`,
      objetoPeticion('GET', undefined, tokenHeader),
    );

    if (respuesta.status === 200) {
      let subtotales = 0;
      let productosCarrito = await respuesta.json();
      setProductosCarrito(productosCarrito);

      for (let i = 0; i < productosCarrito.length; i++) {
        subtotales += productosCarrito[i]['subtotal'];
      }
      setTotal(subtotales);
    } else {
      setProductosCarrito([]);
      setTotal(0);
    }
  };

  const agregaProductoCarrito = async (propsProducto) => {
    const respuesta = await fetch(
      `${API_URL}/api/catalogo/agregaCarrito`,
      objetoPeticion('POST', propsProducto),
    );

    if (respuesta) {
      enqueueSnackbar(
        `Se agregó ${propsProducto.cantidadCarrito} ${propsProducto.nombreProducto}(s) a la cesta`,
        { variant: 'success' },
      );
    } else {
      enqueueSnackbar(respuesta.msg, { variant: 'error' });
    }
    await muestraCarrito();
    await cantidadProductos();
  };

  const toggleVista = async (propsProducto) => {
    setProducto(propsProducto);
    navigate('/main/vistaPrevia');
  };

  const pagar = async () => {
    await fetch(`${API_URL}/api/catalogo/pagar`, objetoPeticion('GET'))
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTotal(0);
        setCarrito(0);
        setProductosCarrito([]);
        enqueueSnackbar(datos.msg, { variant: 'success' });
      });

    navigate('/main');
  };

  const salir = () => {
    localStorage.removeItem('token');
    enqueueSnackbar('Hasta luego...', { variant: 'success' });
    navigate('/login');
  };

  useEffect(() => {
    const validarSesion = async () => {
      const tokenActual = obtenerToken();
      setToken(tokenActual);

      if (tokenActual === 'null' || !tokenActual) {
        enqueueSnackbar('Por favor autenticarse primero...', { variant: 'error' });
        navigate('/login');
        return;
      }

      setAutenticado(true);
      await cantidadProductos(tokenActual);
      await muestraCarrito(tokenActual);
    };

    validarSesion();
  }, []);

  return (
    <div className="fondo3">
      <div className="encabezado">
        <Encabezado carrito={carrito} salir={salir} />
      </div>

      <Routes>
        <Route
          path="carrito"
          element={<Carrito productosCarrito={productosCarrito} total={total} pagar={pagar} />}
        />
        <Route
          path="vistaPrevia"
          element={
            autenticado === true ? <VistaPrevia producto={producto} /> : <Navigate to="/login" />
          }
        />
        <Route
          path=""
          element={
            <CatalogoProductos toggleVista={toggleVista} agregarProducto={agregaProductoCarrito} />
          }
        />
      </Routes>
    </div>
  );
}

export default Main;
