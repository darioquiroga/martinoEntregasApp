import { Control } from './../modelo/control';
import { Usuario } from 'src/app/modelo/usuario';
import { Token } from 'src/app/modelo/token';
import { DEFAULT_CURRENCY_CODE, Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Cuenta } from 'src/app/modelo/cuenta';


//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Le agrego el authService. Para que use el token.
import { LoginService } from 'src/app/services/login.service';

//Agrego las configuraciones
import { Configuraciones } from 'src/app/shared/constants/configuraciones';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';
/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
export class BuscarCamionService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.miCuentaUrl;
  public miCuenta: any;
  public flag: boolean = false;
  public control: any;
  public logueado: boolean = false;
  public respuesta : any;
  //private loginService: LoginService | any;
  //---------------------------------------------//

  usuarioActual: any;
  errors: Object | undefined;

  // Metodo constructor
  constructor(public http: HttpClient) { }
  public configuraciones = Configuraciones;
  // Este metodo invoca el servicio y parsea la respuesta




  /**
  * Esta funcion devuelve la URL del servicio
  */




  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return BuscarCamionService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`+'/xxxxxx';

  }

}
