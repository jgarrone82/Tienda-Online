import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  datoProductos = [];
  filtrado = ''
  productoCarrito:  {idProducto: '',  cantidadCarrito}

  constructor(
    private ProductosService: ProductosService,
    private router: Router
  ) 
  {
    this.ProductosService.cargaInventarioInicial() 
    .subscribe(
      datos=>{console.log("Inventario: ", datos)}
    )
  }

  ngOnInit() {
    this.ProductosService.productos()
    .subscribe(
      datos=>{
        console.log("La respuesta fue: ", datos)
        this.datoProductos = datos   
      },
      error => {console.log("Hubo error: ", error)}
    )
  }

  productoSeleccionado(producto){
    this.ProductosService.vistaProductos(producto)  
    this.router.navigate(['/main/vistaPrevia'])
  }

  agregaCarrito(producto, cantidadCarrito)
  {  
    this.productoCarrito = {idProducto: producto.idProducto, cantidadCarrito: parseInt(cantidadCarrito)} 
    this.ProductosService.agregaCarrito(this.productoCarrito)                      
    .subscribe
    (
      respuesta=>{
        if (respuesta){
          alert("Se agregó " + cantidadCarrito + " " + producto.nombreProducto + "(s) a la cesta")
        }else {
          alert(respuesta.msg)
        }  
      },
      error=>{console.log("Hubo error carrito:",error)},
      ()=>{        
        this.ProductosService.cantidadProductos()
      }  
    )

  }

  
}

