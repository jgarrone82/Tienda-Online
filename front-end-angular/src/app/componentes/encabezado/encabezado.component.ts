import { Component } from '@angular/core';
import { AutorizarService } from '../../services/autorizar.service'
import { Router } from '@angular/router'
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {

  constructor(
    public ProductosService: ProductosService,
    private AutorizarService: AutorizarService,
    private router: Router 
  ) 
  {
    this.ProductosService.cantidadProductos()
  }

  salir(){
    this.AutorizarService.logout()
    this.router.navigate(['sigin'])
  }

}
