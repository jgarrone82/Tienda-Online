import React, { useEffect, useState } from 'react';
import ProductoCard from './ProductoCard'

function CatalogoProductos(props) {
    const URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const [terminoBusqueda, setTerminoBusqueda] = useState('')

    const cargueProductos = async () => {
        try {
            setCargando(true)
            setError('')
            const respuesta = await fetch(URL + '/catalogo/cargueProductos')
            const datos = await respuesta.json()
            setProductos(datos)
        } catch (err) {
            setError('Hubo un error al cargar productos')
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        cargueProductos()
    }, [])

    const handleBuscar = (e) => {
        setTerminoBusqueda(e.target.value)
    }

    const productosFiltro = productos.filter((producto) => producto.nombreProducto.toLowerCase().indexOf(terminoBusqueda.toLowerCase()) > -1)

    return (
        
        <div className="catalogoProductos">
            <div className="buscador">
                <div>
                    <h1>Catálogo de productos</h1>
                </div>
                <div>
                    <p>¿Qué estás buscando?</p>  
                    <input type="text" name="buscar" onChange={handleBuscar} className="catalogoInput" placeholder="Escribe..."/>
                </div>
            </div>
            <div className="catalogoContenedor">
                {cargando && <p>Cargando productos...</p>}
                {error && <p>{error}</p>}

                {
                    !cargando && !error && productosFiltro.map((producto) => {
                        return(
                            <ProductoCard
                                key = {producto.idProducto}
                                idProducto = {producto.idProducto}
                                nombreProducto = {producto.nombreProducto}
                                imagenUrl = {producto.imagenUrl}
                                cantidadDisponible = {producto.cantidadDisponible}
                                precioUnitario = {producto.precioUnitario}
                                toggleVista = {props.toggleVista}
                                agregarProducto = {props.agregarProducto}
                                history = {props.history}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}


export default CatalogoProductos
