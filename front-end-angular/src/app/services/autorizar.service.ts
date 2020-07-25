import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizarService {

  private URL = 'http://localhost:4000/API'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }        

  login(usuario){
    return this.http.post<any>(this.URL + '/login',usuario);
  }

  signin(nuevoUsuario){
    return this.http.post<any>(this.URL + '/nuevoUsuario', nuevoUsuario);
  }

  loggenIn(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }

  obtenerToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['login'])      
  }

}
