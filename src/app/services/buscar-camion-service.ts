import { Injectable } from '@angular/core';

import { CartaPorteHistoria } from '../modelo/cartaPorteHistoria';
import { UiService } from './ui.service';
import { CartaPosicionCamionero } from '../modelo/cartaPosicionCamionero';
import { StorageService } from './storageService';
import { Configuraciones } from '../shared/constants/configuraciones';
import { Camionero } from '../modelo/camionero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})

export class BuscarCamionService {
    constructor(

      public http: HttpClient,
      private loginService: LoginService,
      private uiService: UiService,
    ) {}

    /**
    * @description Hace la consulta (a travez de authservice) y retorna las cartas bie formateadas
    * @argument {string} paramBusqueda Puede ser el nro de carta o la patente del camion
    */
    public static URLSERVICIO: string = Configuraciones.urlBase;
    public static URLSERVICIOPUERTOS: string = Configuraciones.urlBasePuertos;
    async  getCartaDePorteCamion  (paramBusqueda: string) {

      let paramBusquedaTemp: String;
      if(paramBusqueda.length > 8){
        paramBusquedaTemp = paramBusqueda.slice(3,12);
      }else{
        paramBusquedaTemp = paramBusqueda;

      }



      // Mapeo el array posicionDia de la respuesta en otro array de modelos CartaPorte, y lo retorno

     return new Promise(async (resolve, reject) => {
        try {


         //let parameters:URLSearchParams = new URLSearchParams();
         //parameters.set("paramBusqueda", paramBusqueda);



          const url = `${this.getURLServicio()}/`+paramBusquedaTemp

          const httpOptions = {
            headers: new HttpHeaders({
               // token: token.replace(/['"]+/g, ''),
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
    /*

       const descarga = await this.authService.getDescarga(currentToken, fechaDesde, fechaHasta, isPuertos)
          .map((descargaResponse: any[]) => {
              return descargaResponse.map(
                  cp => isPuertos ? new CartaPortePosicion(cp, isPuertos) : new CartaPorteHistoria(cp)
              )
          }
          )
          .toPromise()

      return ""; //descarga
    */




    }
    getIntervinienteOfArray(arrayIntervi: any[], nombreIntervi: any) {
      const titular = arrayIntervi.filter(interArray => interArray.tipoInterviniente.nombre === nombreIntervi);
      // Como filter retorna un array, retorno el 1er elemento de ese array
      return titular[0];
  }

  // Obtiene un string con el destino y la planta fusionados, lo que sería el puerto
  getPuerto(carta: any) {

    // Si es puertos hace una cosa, si es cerealnet hace otra (si la carta es CartaPortePosicion, es PUERTOS. Sino, es CEREALNET)
    // const isPuertos = !(carta && carta.getIntervinienteByTipo);

    // if (isPuertos) {
    //     return 'fafa'
    // } else {

        let nombreDestinoAcortado = ""//this.uiService.getFirstWordOfString(carta.plantaDestino.descripcion);

        if (nombreDestinoAcortado && carta.plantaDestino.descripcion) {
            return `${nombreDestinoAcortado}, ${carta.plantaDestino.descripcion}`;
        } else if (nombreDestinoAcortado && !carta.plantaDestino.descripcion) {
            return `${nombreDestinoAcortado}`;
        } else if (!nombreDestinoAcortado && carta.plantaDestino.descripcion) {
            return `${carta.plantaDestino.descripcion}`;
        } else {
            return '';
        }
    // }
}

/*
    getCartasPorte(paramBusqueda: string) {
        return this.authService.getCamionPosicion(paramBusqueda)
            .then(resp => {

                const [cartasPuerto, cartasCn] = resp;

                if (cartasPuerto && cartasPuerto.length > 0) {
                    return cartasPuerto;
                } else {
                    return cartasCn;
                }
            });
    }
*/
    /**
    * @description Solicita el llamado del entregador al camionero
    */
    /*async solicitarLlamado(cartaPorte: CartaPosicionCamionero) {
        const camioneroActivo: Camionero = await this.storageService.getUsuarioActivo();

    // TODO: Refactor esto como poscioinDiaService

        // Solicito el llamado
        this.utilsService.showAlert(
            'Aviso',
            '¿Deseas mandar un mail al entregador solicitando su llamado?',
            () => this.authService.solicitarLlamado(
                cartaPorte.entregador.idEntregador,
                camioneroActivo.deviceId,
                tipoSesion.INVITADO,
                ''
            ),
            true
        )

    }*/
    private getURLServicio() {


      return BuscarCamionService.URLSERVICIO + `/cartaPorte/posicion`
      //return BuscarCamionService.URLSERVICIOPUERTOS + `/cartaPorte/posicion`


    }
}
