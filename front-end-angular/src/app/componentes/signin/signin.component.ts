import { Component, OnInit } from '@angular/core';
import { AutorizarService } from '../../services/autorizar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  nuevoUsuario = {nombre: '', correo: '', contrasena1: '', contrasena2: ''}

  constructor(
    private AutorizarService: AutorizarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin(){
    console.log(this.nuevoUsuario)
    
    this.AutorizarService.signin(this.nuevoUsuario)
    .subscribe(
      respuesta=>{
        console.log(respuesta)
        if (respuesta.resultado="SI"){
          alert(respuesta.msg)
          this.router.navigate(['']) 
        }   
      },
      error=>{console.log(error)}
    )
    
  }


}
