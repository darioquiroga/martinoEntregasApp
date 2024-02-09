import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { textos } from '../shared/textos/textos';
import { Usuario } from '../modelo/usuario';
import { Camionero } from '../modelo/camionero';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private _alertCrontroller: AlertController,
    private _loadingController: LoadingController
  ) {}

  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  public usuarioActivo: any;
  async presentAlertInfo(message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Atención !!!';
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }
  async presentAlertConfirm(header: string , message: string, onClickOk?: any, tipoSiNo?: any, withSpinner?: any) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons =  [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('---> Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: data => {
          if (onClickOk) {
              onClickOk();
          }
      }
      }
    ]

    document.body.appendChild(alert);
    await alert.present();
  }



// Insertar un string en el indice que quieras de cualuqier string
insertString(index: number, stringBase: string, stringInsertar: string) {
  if (index > 0)
      return stringBase.substring(0, index) + stringInsertar + stringBase.substring(index, stringBase.length);
  else
      return stringInsertar + stringBase;
};
  async presentLoading(msg: string) {
    const loading = await this._loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
    });
    await loading.present();
  }

  // Formatea una fecha y devuelve foramto DD/MM/AAAA
  // Puede recibir un Date o un string
  formatDate(fecha: any) {
    let fechaDate;

    if (typeof fecha === 'string') {
      fechaDate = new Date(fecha);
    } else {
      fechaDate = fecha;
    }

    if (fechaDate && typeof fechaDate == 'object') {
      const mes = fechaDate.getMonth() + 1;
      return `${fechaDate.getDate() < 10 ? '0' : ''}${fechaDate.getDate()}/${
        mes < 10 ? '0' : ''
      }${mes}/${fechaDate.getFullYear()}`;


    }
    return fecha;
  }
  // Obtener la primer palabra de un string
  getFirstWordOfString(cadena: String) {
    // Separo la cadena en un array de sus palabras
    let cadenaArray = cadena.split(' ');
    // Me fijo si tiene palabras el array
    if (cadenaArray && cadenaArray.length > 0) {
      // Retorno la primera
      return cadenaArray[0];
    } else {
      return '';
    }
  }

  // Sync
  getUsuarioActivoSync = () => {
    if (typeof this.usuarioActivoJson === 'string') {
      this.usuarioActivo = JSON.parse(this.usuarioActivoJson);
      const plainUserActivo = this.usuarioActivo;
      return plainUserActivo && plainUserActivo.cuitEmpTrans ?
      new Camionero(plainUserActivo) :
          plainUserActivo && plainUserActivo.idUsuario ?
          new Usuario(
              plainUserActivo
          ) :
              plainUserActivo && plainUserActivo.usuarioPK ?
              new Usuario(
                  plainUserActivo,
                  true
              ) :
              null
    }else{
      return false
    }

  };

  /**
   * Obtengo el id del estado de entrega segun el id de un estado en puertos
   */
  getIdEstadoEstregaByIdEstadoPuerto = (idEstadoPuerto: number) =>
    idEstadoPuerto === 1
      ? 2 // Demorado      |       Demorado
      : idEstadoPuerto === 2
      ? 6 // A Descargar   |       A Descargar
      : idEstadoPuerto === 4
      ? 7 // Autorizado
      : idEstadoPuerto === 7
      ? 4 // Desvio/Desviado
      : idEstadoPuerto === 10
      ? 1 // Pendiente Autorizacion | Entrega Autorizado
      : idEstadoPuerto === 11
      ? 9 // Pendiente Desvio| Entrega Desvio
      : 1; // Posicion para todo el resto
}
