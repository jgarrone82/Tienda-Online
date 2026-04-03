import React from 'react'

const ProductoCarrito = (props) => (
    
    props.productosCarrito.map((producto, indice) => {
        return (
                <div className="carritoDetalle" key={indice}>
                    <div className="foto">
                        <img src={new URL('../assets/img/' + producto.imagenUrl, import.meta.url).href} className="carritoImg" alt="carritoProducto"/>
                    </div>
                    <div>
                        <p className="carritoItem"><strong>{producto.nombreProducto}</strong></p>
                        <p className="carritoItem"><strong>Unidades: </strong><span>{producto.cantidadCarrito}</span></p>
                        <p className="carritoItem"><strong>Subtotal: </strong><span>{producto.subtotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span></p>
                    </div>
                </div>
        )
    })
)
export default ProductoCarrito
