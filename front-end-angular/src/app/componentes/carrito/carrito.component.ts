import { Component} from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router'
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  carritoProductos: any[] = [] 
  total = 0

  constructor( 
    private ProductosService: ProductosService,
    private router: Router 
  ) 
  {
    this.ProductosService.detalleCarrito().subscribe(
      datos=>{        
        this.carritoProductos = datos.body
        if (this.carritoProductos != null){
          for (var i=0; i<this.carritoProductos.length; i++){
            this.total += this.carritoProductos[i]['subtotal'] 
          }
        }

      })     
  }

  pagar(){
    this.ProductosService.pagar().subscribe
    (
      datos=>{
        alert(datos.msg)
      },
      (error) => console.log(error),
      () => {
        this.ProductosService.carritoEncabezado = 0
        this.router.navigate(['/main']) 
      }   
    )
      
  }


}
