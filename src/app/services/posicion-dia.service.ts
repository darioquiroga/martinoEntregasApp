import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
// ------------ MODELOS -----------------------------------///
import { CartaPortePosicion } from '../modelo/cartaPortePosicion';
import { EstadoCarta } from '../modelo/estadoCarta';
//------------IMPORTO LAS CLASES QUE NECESITO ------------//
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { ResponsiveTableService } from './responsive-table.service';
import { PuertosService } from './puertos.service';
//------------ shared ------------//
import { estadosCartaPosicion, estadosCartaPosicionPuertos } from '../shared/constants/estadosCartaPorte';
import { perfilesUsuarios } from '../shared/constants/perfilesUsuarios';
import { textos } from '../shared/textos/textos';
import { tiposAcciones } from '../shared/constants/tiposAcciones';
import { tipoSesion } from '../shared/constants/tipoSesion';
//import * as _  from '@angular/core';
import { filter, concat, map } from 'rxjs';
import * as _ from 'lodash';
import { Configuraciones } from 'src/app/shared/constants/configuraciones';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoAccion } from '../modelo/tipoAccion';
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/angular';

/**
* Esta clase se creo para invocar el recurso del servicio web que devuelve el
* resumen de la cuenta
*/
@Injectable({
  providedIn: 'root'
})
export class PosicionDiaService {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.urlBase;
  public static URLSERVICIOPUERTOS: string = Configuraciones.urlBasePuertos;

  public flag: boolean = false;
  //private loginService: LoginService | any;
  //---------------------------------------------//

  usuarioActual: any;
  resumenSocio: any;
  // Metodo constructor
  constructor(public http: HttpClient,
    private responsiveTableService: ResponsiveTableService,
    private puertosService: PuertosService, private uiService: UiService) { }
  public configuraciones = Configuraciones;
  // Hago la consulta
  async getPosicionDia() {
    // Mapeo el array posicionDia de la respuesta en otro array de modelos CartaPorte, y lo retorno
    const currentToken = localStorage.getItem("token");
    return new Promise(async (resolve, reject) => {
      try {
        const isPuertos = this.puertosService.getIfPuertos()
       const token: any = currentToken;
       let parameters:URLSearchParams = new URLSearchParams();
        const url = `${this.getURLServicio(isPuertos)}?`+parameters;
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


};





  // Este metodo invoca el servicio y parsea la respuesta
  public async load() {
    /*const usuarioActualStr = localStorage.getItem('usuarioActual');
    if (usuarioActualStr) {
      this.usuarioActual = JSON.parse(usuarioActualStr);
    }

    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.getURLServicio()}`;
        const params = { };
        const httpOptions = {
          headers: new HttpHeaders({
            token: this.usuarioActual.token.hashId,
          }),
        };

        this.http.get(url,  httpOptions).subscribe((data : any)   => {
          // data is already a JSON object
          this.resumenSocio = data;
          let control = this.resumenSocio.control;

          if (control.codigo == "OK"){
           // this.resumen = new Resumen(this.resumenSocio.datos);
            resolve(
              {
             //   resumen: this.resumen,
              //  funciones: this.usuarioActual.funciones
              });
          }


        });


      } catch (error: any) {

        const dataError = JSON.parse(error.error)
        reject(dataError.control.descripcion);
      }
    });*/


  }










// Checkea si el camion es desviable o autorizable (estado Demorado o Rechazado)
    // También checkea que eluser logueado sea autorizador
    checkIfAccionable(
      cartaPorte: any,
      usuarioActivo: { perfil: { id: number; }; }
  ) {
      if (this.puertosService.getIfPuertos() === true){
      return (
          (cartaPorte.estado.estado === estadosCartaPosicion.Demorado ||
          cartaPorte.estado.estado === estadosCartaPosicion.Rechazo)  &&
          (usuarioActivo.perfil.id === perfilesUsuarios.USUARIO_AUTORIZACION)
      ) ? true : false;
    }else{
      return (
        (cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado ||
        cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Rechazo)  &&
        (usuarioActivo.perfil.id === perfilesUsuarios.USUARIO_AUTORIZACION)
    ) ? true : false;
    }

  }

  // Reduce el parcial table. Por ahroa se quita elementos del final de la lista nomas
    reduceParcialTable(
        parcialTable: CartaPortePosicion[],
        cantABorrar: number
    ) {
        return parcialTable.slice(
            0,
            parcialTable.length - cantABorrar
        )
    }
 // Recibe los fab's activos y los cierra
 closeFabs(fabCollection: IonFab[]) {
  fabCollection.forEach(fab => {
      fab.close();
  });
}
// Ordena la posicion
order(posicionCompletaDelDia: CartaPortePosicion[]) {

  if (this.puertosService.getIfPuertos()) {
      return concat(
          posicionCompletaDelDia.filter(p => p.estadoPosiReal === 'Demorado'),
          posicionCompletaDelDia.filter(p => p.estadoPosiReal === 'Rechazado'),
          posicionCompletaDelDia.filter(p => p.estadoPosiReal === 'Autorizado'),
          posicionCompletaDelDia.filter(p => p.estadoPosiReal === 'Desviado'),
          posicionCompletaDelDia.filter(
              p =>    p.estadoPosiReal !== 'Demorado' &&
                      p.estadoPosiReal !== 'Rechazado' &&
                      p.estadoPosiReal !== 'Autorizado' &&
                      p.estadoPosiReal !== 'Desviado'
          )
      )
  } else {
      return concat(
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Rechazo),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Autorizado),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Desviado),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Pendiente_Desvio),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Pendiente_Autorizacion),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Ingreso),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.A_Descargar),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Descargado_Pendiente),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === estadosCartaPosicion.Descargado),
          posicionCompletaDelDia.filter(p => p.estadoCarta.idEstadoCarta === 0)
      )
  }

}
// Filtrando
filter(activeFilters: {estado: string, destino: string}, completeTableData: CartaPortePosicion[]) {
  const isPuertos = this.puertosService.getIfPuertos();


  // Antes que nada checkeo si el filtro es 'todos' retorno todas las cps
  if (!activeFilters.destino && !activeFilters.estado) {
      // Retorno la tabla parcial inicial
    return this.responsiveTableService.getInitParcialTable(completeTableData);
  }

  // Si existen los dos filtros, filtro por ambos. Sinó, filtro por cualquiera de los dos
  let newTableDate = _.filter(completeTableData, (cartaPorte: CartaPortePosicion) => {

      // Primero checkeo que tenga destino
      if (cartaPorte.destino) {

          return (activeFilters.estado && activeFilters.destino) ? //¿Existen ambas?
              (
                  (
                      isPuertos ?
                          cartaPorte.plantaDestino.descripcion === activeFilters.destino :
                          cartaPorte.destino.descripcion === activeFilters.destino
                  ) && //Filtra ambas con &&
                  cartaPorte.estadoCarta.descripcion === activeFilters.estado) :
              (
                  (
                      isPuertos ?
                          cartaPorte.plantaDestino.descripcion === activeFilters.destino :
                          `${cartaPorte.destino.descripcionAbre}, ${cartaPorte.plantaDestino.descripcion}` === activeFilters.destino
                  ) || // Filtro una u otra con ||
                  cartaPorte.estadoCarta.descripcion === activeFilters.estado
              )
      } else {
          // Si la CP no tiene destino no la incluyo
          return false;
      }

  });

return newTableDate

}
// Retorna los nuevos filtros activos
getNewActiveFilters(filter: string, typeFilter: string, oldActiveFilters: {estado: string, destino: string}) {
  // Primeramente checkeo si está limpiando los filtros, en ese caso retorno un activeFilters vacio
  if (typeFilter === 'todos') {
      return {estado: null, destino: null};
  }
  // hago una copia para evitar mutación
  const  activeFilters : any = oldActiveFilters;
  //const activeFilters: {estado: string, destino: string} = oldActiveFilters;
  // Asigno el nuevo filtro. Ejemplo activeFilters['estado'] = 'Demorado';
  activeFilters[typeFilter] = filter;

  return activeFilters;
}
// Retorna un titulo acorde al filtro dado, con la cantidad filtrada
getTituloFiltrado(filter: string, typeFilter: string) {
  if (typeFilter === 'estado') {
      // Si sus últimas 3 letras son 'ado', entonces le agrego una 's'
      if (filter.substr(filter.length - 3) === 'ado') {
          return `Camiones ${filter}s: `; //Ejemplo: Camiones Demorados: 123
      } else if (filter === 'Rechazo') {
          return `Camiones Rechazados: `;
      } else if (filter === 'Ingreso') {
          return `Camiones Ingresados: `;
      } else {
          return `${filter}: `;
      }
  } else if(typeFilter === 'destino') {
      // Si el nombre es muy largo, lo acorto para que entre
      if (filter.length >= 16) {
          return `${filter.substr(0, 16)}: `;
      } else {
          return `${filter}: `;
      }
  }
  return `${filter}: `;

}

// Extrae las descricipnes de lso destinos de tableDate, luego los retorna.
getDestinosList(tableDate: CartaPortePosicion[]) {
  // Guardo solo las descripciones de los destinos en el array. uniq es para borrar los repetidos
  return _.compact(
      _.uniq(
          _.map(tableDate,
              (cartaPorte: { destino: { descripcionAbre: any; }; plantaDestino: { descripcion: any; }; }) => {
                  if (cartaPorte.destino && cartaPorte.plantaDestino) {
                      if (this.puertosService.getIfPuertos()) {

                          return `${cartaPorte.plantaDestino.descripcion}`;
                      } else {
                          return `${cartaPorte.destino.descripcionAbre}, ${cartaPorte.plantaDestino.descripcion}`;
                      }
                  } else if (cartaPorte.destino) {
                      return cartaPorte.destino.descripcionAbre;
                  }
              }
          )
      )
  );
}




getAnalisis = (cartaPorte: CartaPortePosicion) => {

        const parseAnalisis = (a: any) =>
            `${a.rbr_abrev}: ${a.anl_porc_analisis}% ${a.anl_porc_merma !== 0 ? `${
                a.rbr_abrev === 'HD' ? 'M' : 'R'
            }: ${a.anl_porc_merma}%` : ''}`;


        const analisis = cartaPorte &&
            cartaPorte.analisis ? cartaPorte.analisis
                .map(anal => parseAnalisis(anal))
                .join(' ')
                .concat(cartaPorte.observacion ? cartaPorte.observacion : '') :
            cartaPorte.observacion ? cartaPorte.observacion : ''

        return analisis;
    }
// Recibe la lista de estados de carta de porte y la reformatea para mostrarlas mas lindas
formatEstadosCartaPosicion(estadosCartaPosicion: any) {
  return Object.keys(estadosCartaPosicion)
      .map(estado => estado.replace('_',' '));
}

checkIfDesviableOrLlamable(
  cartaPorte: CartaPortePosicion
) {
  if (this.puertosService.getIfPuertos()) {
      return false;
  }
  return (
      (cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado ||
      cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Rechazo)
  ) ? true : false;
}

checkIfAutorizable(
  cartaPorte: CartaPortePosicion
) {
  if (this.puertosService.getIfPuertos()) {
      return false;
  }
  return (
      (cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado)
  ) ? true : false;
}

// Solicita una accion, y hace lo correspondiente
async solicitarAccion(
  cartaPorte: any,
  tipoAccion: number
   // event: any
) {

  // Checkeo si solicita un llamado o una accion //
  if (tipoAccion === tiposAcciones.SOLICITUD_LLAMADO ) {

     this.uiService.presentAlertConfirm(textos.posicionDia.solicitarLlamado.titulo, textos.posicionDia.solicitarLlamado.descripcion,
      async() => {
        try {
            // Obtengo token del user

            // Nota: El await es requerido porque sinó NO dispara el catch de abajo
           /* await this.authService.solicitarLlamado(
                cartaPorte.entregador.idEntregador,
                '',
                tipoSesion.NORMAL,
                currentToken
            );*/


            return new Promise(async (resolve, reject) => {
              try {
                const isPuertos = this.puertosService.getIfPuertos()
               const currentToken:any = localStorage.getItem('token')?.toString();
               let parameters:URLSearchParams = new URLSearchParams();
                const url = `${this.getURLServicioSolicitarLlamado(isPuertos)}?`+parameters;
                const httpOptions = {
                  headers: new HttpHeaders({
                      token: currentToken.replace(/['"]+/g, ''),
                  }),

                };

                this.http.post(url,  httpOptions).subscribe({
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

        } catch(err) {
            this.uiService.presentAlertInfo(textos.posicionDia.solicitarLlamado.error.titulo+": "+
              textos.posicionDia.solicitarLlamado.error.descripcion)

        }
    },
    true
  )





  }else {
      // Solicitó acción. Checkeo si son clientes o si es puertos
      const isPuertos = this.puertosService.getIfPuertos();
      //
      /*if (isPuertos) {
          // Si el usuario es de puertos
          // this.navCtrl.push(AccionPuertosPage, {cartasEncontradas: cartasEncontradas});
          this.app.getActiveNav().push(
              AccionPuertosPage,
              {
                  cartaPorte,
                  tipoAccion
              }
          );
      } else {
          // Si el usuario es un cliente
          this.utilsService.showAlert(
              textos.posicionDia.solicitarAccion.titulo,
              textos.posicionDia.solicitarAccion.descripcion,
              async() => {
                  try {
                      // Obtengo token del user
                      const currentToken = await this.storageService.getToken();

                      // Solicito la accion
                      this.authService.solicitarAccion(
                          cartaPorte,
                          tiposAcciones[tipoAccion],
                          currentToken
                      );


                      // Y ahora muto la cartaPorte que me viene por parámetros así se actualiza la vista
                      cartaPorte.setEstadoCarta(
                          this.getEstadoByTipoAccion(tiposAcciones[tipoAccion])
                      );

                      // Agrego la clase del color
                      //event.target.classList.add('class3');

                  } catch(err) {
                      //console.log(err);
                      this.utilsService.showAlert(
                          textos.posicionDia.solicitarAccion.error.titulo,
                          textos.posicionDia.solicitarAccion.error.descripcion
                      );
                  }
              },
              true
          )
      }*/

  }

}

// Checkea si el camion es desviable o autorizable (estado Demorado o Rechazado)
    // También checkea que eluser logueado sea autorizador
   /* checkIfAccionable(
      cartaPorte: CartaPortePosicion,
      usuarioActivo
  ) {
      return (
          (cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado ||
          cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Rechazo)  &&
          (usuarioActivo.perfil.id === perfilesUsuarios.USUARIO_AUTORIZACION)
      ) ? true : false;
  }*/

 /* checkIfDesviableOrLlamable(
      cartaPorte: CartaPortePosicion
  ) {
      if (this.puertosService.getIfPuertos()) {
          return false;
      }
      return (
          (cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado ||
          cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Rechazo)
      ) ? true : false;
  }

  checkIfAutorizable(
      cartaPorte: CartaPortePosicion
  ) {
      if (this.puertosService.getIfPuertos()) {
          return false;
      }
      return (
          (cartaPorte.estadoCarta.idEstadoCarta === estadosCartaPosicion.Demorado)
      ) ? true : false;
  }*/


// Obtengo el estado a partir del tipo de acción
getEstadoByTipoAccion(tipoAccion: number) {
  if (tipoAccion == tiposAcciones.SOLICITUD_AUTORIZACION) {
      return new EstadoCarta({
          idEstadoCarta: estadosCartaPosicion.Pendiente_Autorizacion,
          descripcion: 'Pendiente Autorizacion'
      });
  } else if (tipoAccion == tiposAcciones.SOLICITUD_DESVIO) {
      return new EstadoCarta({
          idEstadoCarta: estadosCartaPosicion.Pendiente_Desvio,
          descripcion: 'Pendiente Desvio'
      });
  } else {
      return null;
  }
}

  /**
  * Esta funcion devuelve la URL del servicio
  */
  private getURLServicio(puertos: boolean) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    if(puertos === true){
      return PosicionDiaService.URLSERVICIOPUERTOS+`/cartaPorte/posicion`;
    }else{
      return PosicionDiaService.URLSERVICIO + `/cartaPorte/posicion`;
    }
  }
  private getURLServicioSolicitarLlamado(puertos: boolean) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    if(puertos === true){
      return PosicionDiaService.URLSERVICIOPUERTOS+`/notificaciones/solicitud-llamado`;
    }else{
      return false;
    }
}


}
function fill(completeTableData: CartaPortePosicion[], arg1: (cartaPorte: CartaPortePosicion) => boolean) {
  throw new Error('Function not implemented.');
}

