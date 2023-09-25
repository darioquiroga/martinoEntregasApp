
import { Injectable } from '@angular/core';
import { CartaPorteHistoria } from '../modelo/cartaPorteHistoria';
import { UiService } from './ui.service';
import { PuertosService } from './puertos.service';
import { LoginService } from './login.service';
import { Login } from '../modelo/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuraciones } from '../shared/constants/configuraciones';





@Injectable({
  providedIn: 'root'
})
export class BuscarCartaPorteService {
    constructor(public http: HttpClient,
        private loginService: LoginService,
        private uiService: UiService,
        private puertosService: PuertosService
    ) { }

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.urlBase;


/**
    * @description Busca y retorna una (o varias) cartas del historico de descargas
    * @argument {string} token Token del acceso del usuario
    * @argument {string} paramBusqueda Puede ser el nro de carta o la patente del camion
    * @argument {string} fechaDesde Fecha desde cual buscar cuando se busca por patente
    * @argument {string} fechaHasta Fecha hasta cual buscar cuando se busca por patente
    */
 async  getCartaPorte  ( paramBusqueda: string, filtroFechas: { desde: Date, hasta: Date }) {
let fechaDesde = this.uiService.formatDate(filtroFechas.desde)
let fechaHasta = this.uiService.formatDate(filtroFechas.hasta)

//////////////////////////////////////////////
  const isPuertos = this.puertosService.getIfPuertos();
  const currentToken = localStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    try {

     const token: any = currentToken;
     let parameters:URLSearchParams = new URLSearchParams();
      parameters.set("fechaDesde", fechaDesde.toString());
      parameters.set("fechaHasta", fechaHasta.toString());

    const url = `${this.getURLServicio()}?`+parameters+"&paramBusqueda="+paramBusqueda;

      const httpOptions = {
        headers: new HttpHeaders({
            token: token.replace(/['"]+/g, ''),
        }),

      };

      this.http.get(url,  httpOptions).subscribe({
        next: (data: any) => {

           resolve (
              {
                data
              }
            );


        },

        error: (error: any) => {
          // ourrio algun error en el login
          resolve(error);
        },
      });
    } catch (error: any) {
      alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
      const dataError = JSON.parse(error.error);
      reject(dataError.control.descripcion);
    }
  });

  /**
    * Esta funcion devuelve la URL del servicio
    */
 }

 private getURLServicio() {
  //https://ws.cerealnet.com/cerealnetServiciosWebV2/ws/cartaPorte/descarga/posicion?paramBusqueda=11529644
  return BuscarCartaPorteService.URLSERVICIO + `/cartaPorte/descarga`;

}

}
