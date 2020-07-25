import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { Productos } from '../registros';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL = 'http://localhost:4000/catalogo'
  productoRecibido = {}
  carritoEncabezado: any

  constructor(
    private http: HttpClient
  ) { }

  cargaInventarioInicial(){
    return this.http.get<any>(this.URL + '/inventarioInicial')
  }

  productos(){    
    return this.http.get<Productos[]>(this.URL + '/cargueProductos')                          
  }

  vistaProductos(producto){
    this.productoRecibido = producto
  }

  agregaCarrito(productoCarrito){
    return this.http.post<any>(this.URL + '/agregaCarrito', productoCarrito)
  }

  detalleCarrito(){
    return this.http.get<any>(this.URL + '/muestraCarrito',{observe: 'response'})
  }

  cantidadProductos(){
    this.http.get<any>(this.URL + '/cantidadProductos').subscribe(
      respuesta =>{
        this.carritoEncabezado = respuesta
        console.log("canti: ", this.carritoEncabezado)
      }
    )
    
  }

  pagar(){
    return this.http.get<any>(this.URL + '/pagar')
  }

}
