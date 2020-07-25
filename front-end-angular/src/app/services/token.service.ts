import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';             
import { AutorizarService } from '../services/autorizar.service'

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {      

  constructor(
    private AutorizarService: AutorizarService 
  ) { }

  intercept(peticion, next){  
    let agregaCabecera = 
    peticion.clone({            
      setHeaders: {
        Autorizacion: `Bearer ${this.AutorizarService.obtenerToken()}`  
      }
    })
    return next.handle(agregaCabecera)
  }

  
}
