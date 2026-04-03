import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Encabezado from './Encabezado';
import CatalogoProductos from './CatalogoProductos';
import VistaPrevia from './VistaPrevia';
import Carrito from './Carrito';

function Main(props) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    const [token, setToken] = useState('')
    const [autenticado, setAutenticado] = useState(false)
    const [producto, setProducto] = useState({})
    const [productosCarrito, setProductosCarrito] = useState([])
    const [carrito, setCarrito] = useState(0)
    const [total, setTotal] = useState(0)
    const [mensaje, setMensaje] = useState('')
    const [mensajeTipo, setMensajeTipo] = useState('')
    
    const objetoPeticion = (metodo, datos, tokenHeader = token) => {
        return ({
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'autorizacion': tokenHeader,
                'Origin': '',
                'Host': ''
            },
            body: JSON.stringify(datos)
        })
    }

    const obtenerToken = () => {
        return `Bearer ${localStorage.getItem('token')}`
    }
    
    const cantidadProductos = async (tokenHeader = token) => {
        try {
            const respuesta = await fetch(`${API_URL}/catalogo/cantidadProductos`, objetoPeticion("GET", undefined, tokenHeader))
            let carritoRespuesta = await respuesta.json()
            setCarrito(carritoRespuesta)
        } catch (error) {
            setMensaje('Error al obtener cantidad de productos')
            setMensajeTipo('error')
        }
    }

    const muestraCarrito = async (tokenHeader = token) => {
        const respuesta = await fetch(`${API_URL}/catalogo/muestraCarrito`, objetoPeticion("GET", undefined, tokenHeader))
 
        if (respuesta.status === 200) {
            let subtotales = 0
            let productosCarrito = await respuesta.json()
            setProductosCarrito(productosCarrito)

            for (let i=0; i<productosCarrito.length; i++) {
                subtotales += productosCarrito[i]['subtotal']
            }
            setTotal(subtotales)
        }
    }

    const agregaProductoCarrito = async (propsProducto) => {
        const respuesta = await fetch(`${API_URL}/catalogo/agregaCarrito`, objetoPeticion("POST", propsProducto))
        
        if (respuesta){
            setMensaje("Se agregó " + propsProducto.cantidadCarrito + " " + propsProducto.nombreProducto + "(s) a la cesta")
            setMensajeTipo('exito')
          }else {
            setMensaje(respuesta.msg)
            setMensajeTipo('error')
          }
        await muestraCarrito()
        await cantidadProductos()
    }
    
    const toggleVista = async (propsProducto) => {
        setProducto(propsProducto)
        props.history.push('/main/vistaPrevia')
    }

    const pagar = async () => {
        await fetch(`${API_URL}/catalogo/pagar`, objetoPeticion("GET"))
        .then(respuesta => respuesta.json())
        .then(datos => {  
            setTotal(0)
            setCarrito(0)
            setProductosCarrito([])
            setMensaje(datos.msg)
            setMensajeTipo('exito')
        })

        props.history.push('/main')
    }

    const salir = () => {
        localStorage.removeItem('token')
        setMensaje('Hasta luego...')
        setMensajeTipo('exito')
        props.history.push('/login')
    }

    useEffect(() => {
        const validarSesion = async () => {
            const tokenActual = obtenerToken()
            setToken(tokenActual)

            if (tokenActual === "Bearer null"){
                setMensaje('Por favor autenticarse primero...')
                setMensajeTipo('error')
                props.history.push('/login')
                return
            }

            setAutenticado(true)
            await cantidadProductos(tokenActual)
            await muestraCarrito(tokenActual)
        }

        validarSesion()
    }, [])

    return(
        <div className="fondo3">
            <div className="encabezado">
                <Encabezado carrito={carrito} salir={salir} />
            </div>

            {mensaje && (
                <p className={mensajeTipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>
                    {mensaje}
                </p>
            )}

            <Switch>                  
                <Route exact path="/main/carrito" render={()=> <Carrito productosCarrito={productosCarrito} total={total} pagar={pagar}/>} /> 
                <Route exact path="/main/vistaPrevia" render={() => ( autenticado === true ? <VistaPrevia producto={producto} /> : <Redirect to='/login' /> ) } />
                <Route exact path="" render={() => <CatalogoProductos toggleVista={toggleVista} agregarProducto={agregaProductoCarrito}/> }/>
            </Switch>

        </div>
    )

}


export default Main
