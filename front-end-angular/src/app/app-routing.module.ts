import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizaGuard } from './autoriza.guard';

//Componentes:
import { LoginComponent } from './componentes/login/login.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { MainComponent } from './componentes/main/main.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { VistaPreviaComponent } from './componentes/vista-previa/vista-previa.component';
import { CarritoComponent } from './componentes/carrito/carrito.component'

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},                  //Ruta inicial: Se dice a cual componente debe direccionarse
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'main', component: MainComponent, children:[
    { path: '', component: ProductosComponent, pathMatch: 'full', canActivate: [AutorizaGuard]},
    { path: 'vistaPrevia', component: VistaPreviaComponent, canActivate: [AutorizaGuard]},
    { path: 'carrito', component: CarritoComponent, canActivate: [AutorizaGuard]}
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full'}                            //Para cualquier ruta diferente lo manda al inicio, puede ser una página de error
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
