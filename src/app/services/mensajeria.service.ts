import { Control } from './../modelo/control';

import { Usuario } from 'src/app/modelo/usuario';
import { DEFAULT_CURRENCY_CODE, Injectable } from '@angular/core';

//------------ IMPORTO LAS LIBRERIAS QUE NECESITO ------------//
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Cuenta } from 'src/app/modelo/cuenta';
import '@capacitor-community/http'


//------------IMPORTO LAS CLASES QUE NECESITO ------------//
//Le agrego el authService. Para que use el token.
import { LoginService } from 'src/app/services/login.service';

//Agrego las configuraciones
import { Configuraciones } from '../shared/constants/configuraciones';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../modelo/token';
import * as CryptoJS from 'crypto-js';
import axios from "axios";
import { UiService } from './ui.service';
import { isPlatform } from '@ionic/angular';
import { from } from 'rxjs';
/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.wapiUrl;
  public miCuenta: any;
  public flag: boolean = false;
  public control: any;
  public logueado: boolean = false;
  public respuesta : any;
  public mensajeRespuesta: string = "";

  //private loginService: LoginService | any;
  //---------------------------------------------//
public errorWup: any;
  usuarioActual: any;
  errors: Object | undefined;

  // Metodo constructor
  constructor(public http: HttpClient) { }
  public configuraciones = Configuraciones;
  // Este metodo invoca el servicio y parsea la respuesta

  public tokenWAPPI : any = localStorage.getItem('tokenWappi')?.toString();


  public async enviarMensajeWhatsUWapi(celular: any ,mensaje: any) {

    return new Promise(async (resolve, reject) => {
         try {


         const url = `${this.getURLServicio()}&to=`+celular+`&message=`+mensaje


         const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': this.tokenWAPPI //"33b8c0ae0e9b533d97eddd7f58087ff308276407"
         }),

         };
         this.http.post(url,  httpOptions).subscribe({
           next: (response: any) => {

            if (response.status ==  200 || response.status == "200"){
              resolve({
                respuesta : 1
              });

            }else{
              resolve({
                respuesta : 0
              });

            }
              //this.mensajeRespuesta = response.data

           },
           error: (error: any) => {

            resolve({
               respuesta : -1
             });
           }
         })
         } catch (error: any) {

         resolve({
               respuesta : -1
             });
         }
       });

   }




  /**
  * Esta funcion devuelve la URL del servicio
  */




  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio() {

    return MensajeriaService.URLSERVICIO+"?token="+this.tokenWAPPI;

  }

}
