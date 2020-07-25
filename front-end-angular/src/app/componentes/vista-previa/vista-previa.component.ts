import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'   
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.css']
})
export class VistaPreviaComponent implements OnInit {

  productoVista = <any>{}
  
  constructor(
    private router: Router,
    private ProductosService: ProductosService
  ) { 
      this.productoVista = this.ProductosService.productoRecibido
      console.log("vista-previa producto: ", this.productoVista)
    }

  ngOnInit() {
  }

  productos(){
    this.router.navigate(['main'])
  }

}
