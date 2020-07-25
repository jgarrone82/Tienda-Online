import { Pipe, PipeTransform } from '@angular/core';
import { ProductoCardComponent } from '../componentes/producto-card/producto-card.component';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  
  transform(value: any, arg: any): any {


    const resultadoFiltrado = [];
    for(const elemento of value){
      if(elemento.nombreProducto.toLowerCase().indexOf(arg.toLowerCase()) >-1){ 

        resultadoFiltrado.push(elemento)
      }
    }
    return resultadoFiltrado
  }

}
