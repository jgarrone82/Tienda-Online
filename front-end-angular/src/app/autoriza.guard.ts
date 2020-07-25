//El Guard es una forma de proteger las rutas desde el Frontend. No tiene nada que ver con el Backend
//Esta funcion del Guard es validar si existe un token o no
// Esto se invocará desde app.module providers

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AutorizarService } from './services/autorizar.service'
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AutorizaGuard implements CanActivate {

    constructor(
      private AutorizarService: AutorizarService,
      private router: Router
    ) {  }

  canActivate(): boolean {                            //Validar si existe un token, si la encuentra retorna el booleano true
    if(this.AutorizarService.loggenIn()){
      return true;
    }
    alert("Debe autenticarse primero...")
    this.router.navigate([''])                      //Si no existe el token, manda al usuario al login
    return false
  }
  
}
