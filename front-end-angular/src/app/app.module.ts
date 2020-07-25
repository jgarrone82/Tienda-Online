import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';     //Yo agregué esto y también en providers se agregó el objeto

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

//Componentes:
import { LoginComponent } from './componentes/login/login.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { MainComponent } from './componentes/main/main.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AutorizaGuard } from './autoriza.guard';
import { TokenService } from './services/token.service';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { VistaPreviaComponent } from './componentes/vista-previa/vista-previa.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    SigninComponent,
    SigninComponent,
    MainComponent,
    EncabezadoComponent,
    BuscadorComponent,
    FiltroPipe,
    VistaPreviaComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AutorizaGuard,
    {                                               //Este objeto creado corresponde a HTTP_INTERCEPTORS que se debe agregar esas 3 propiedades. provide con HTTP_INTERCEPTORS que es de Angular. useClass indicando el servicio que agrega el encabezado y multi en true. Esto que agrega se puede ver como una nueva cabecera llamada Autorizaciòn que se puede ver en Devtools sección Network(Red) se busca en el nombre login y en el apartado Headers en 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
