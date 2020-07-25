import { Component, OnInit } from '@angular/core';
import { AutorizarService } from '../../services/autorizar.service' 
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputType = "password";
  ojo = "../../../assets/img/icon-eye.svg";

  usuario = { email: '', pass: ''}

  constructor(
    private AutorizarService: AutorizarService,
    private router: Router 
  ) {  }

  ngOnInit(): void {
  }

  login(){
    console.log("Login: ", this.usuario)

    this.AutorizarService.login(this.usuario)
    .subscribe(   
      respuesta=>{

        if(respuesta.resultado == "Autorizado")
        {
          localStorage.setItem('token',respuesta.token)
          this.router.navigate(['/main'])
        }else{
          alert(respuesta.msg)
        }
      },
      error => {console.log(error)}
    )                                                          
  }

  
}
