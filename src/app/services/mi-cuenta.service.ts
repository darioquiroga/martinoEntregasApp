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
export class MiCuentaService {

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


  public async cambiarClave(claveActual: any, claveNueva : any) {

    const usuarioActualStr = localStorage.getItem('usuarioActual');

    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);

    }

    return new Promise(async (resolve, reject) => {
        try {

        let claveAnteriorEnviar  = CryptoJS.MD5(claveActual)
        let claveNuevEnviar = CryptoJS.MD5(claveNueva);

        ///Inicializo los parametros de GET
        let parameters:URLSearchParams = new URLSearchParams();
        parameters.set("claveAnterior", claveAnteriorEnviar.toString());
        parameters.set("claveNueva", claveNuevEnviar.toString());
        parameters.set("token", this.usuarioActual.token.hashId);
        const url = `${this.getURLServicio()}?`+parameters;;
        const httpOptions = {
          body: null,
        };

        this.http.post(url, httpOptions).subscribe({
          next: (data: any) => {
            this.control = data.control


            // data is already a JSON object
            if (this.control.codigo == "OK"  ){
              // Intento parsear el usuario

              this.usuarioActual.token = new Token(data.datos.token);
              if (this.usuarioActual.token.hashId != null) {
                this.respuesta = this.control;

                resolve({
                  respuesta : this.respuesta
                });
                this.logueado = true;

              }else{
               // COMO DEVUELVO ESTA RESPUESTA HACIA EL mi-cuenta.ts ?
               resolve({
                respuesta : this.respuesta.control
              });
              this.logueado = true;

             }
           }else{

             this.respuesta = this.control;
             resolve(false)

             // Pongo la bandera de logue en true


           }
          },
          error: (error: any) => {



            resolve({
              respuesta : error.error.control

            });

          }
        })

        } catch (error: any) {

          const dataError = JSON.parse(error.error)
          reject(dataError.control.descripcion);
        }

      });



  } // FIN METODO


  /**
  * Esta funcion devuelve la URL del servicio
  */




  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return MiCuentaService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`+'/cambiarClaveApp';

  }

}
