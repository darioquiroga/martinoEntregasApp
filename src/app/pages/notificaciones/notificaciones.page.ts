import { Component, OnInit } from '@angular/core';
import { Notificacion } from 'src/app/modelo/notificacion';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  istodoCargado = false;
  notificaciones: Notificacion[] = [];
  tieneNotificaciones = false;
  numeroMensajes: number = 0;

  constructor(public notificacionesService: NotificacionesService,
              private uiService: UiService) { }

  ngOnInit() {
    this.cargarNotificaciones();
  }

  //spaghetti
  public borrarNotificacion(mensaje: Notificacion) {

    if (mensaje && mensaje.idMensaje) {
      this.notificacionesService.borrarNotificacion(mensaje.idMensaje).then(
        resp => {
          if(resp){
            this.cargarNotificaciones();
          } else {
            this.uiService.presentAlertInfo('El servidor no pudo borrar la notificacion, inténtelo más tarde.');
          }
        }
      );
    }
  }

  public vistearMensaje(mensaje: Notificacion) {
    if (mensaje && mensaje.idMensaje) {
      this.notificacionesService.vistearMensaje(mensaje.idMensaje).then(
        resp => {
          if(resp){
            this.cargarNotificaciones();
          } else {
            this.uiService.presentAlertInfo('El servidor no pudo vistear la notificacion, inténtelo más tarde.');
          }
        }
      );
    }
  }

  public verNotificacion(mensaje: Notificacion) {
    if (mensaje) {
      this.vistearMensaje(mensaje);

      if(mensaje.mensaje) {
        this.uiService.presentAlertInfo(mensaje.mensaje);
      }
    }
  }
  public muestraVistoSn(item: any){
    if (item.visto === true){
      return "ligth";

    }else{
      return "warning";
    }

  }
  private cargarNotificaciones(){
    this.notificacionesService.load().then(
      async (resp: any) => {
        if(resp) {
          this.notificaciones = resp.notificaciones;
          this.numeroMensajes = this.notificaciones.length;
          this.istodoCargado = true;
        }
      }
    );
  }

  parseFecha(fecha: any) {
    const fechaDate = new Date(fecha);
    const fechaParseada =   (fechaDate.getUTCDate() < 10 ? ("0" + fechaDate.getUTCDate().toString()) : fechaDate.getUTCDate().toString())
                            + "/" +
                            (fechaDate.getUTCMonth() < 10 ? ("0" + (fechaDate.getUTCMonth() + 1).toString()) : (fechaDate.getUTCMonth() + 1).toString())
                            + "/" +
                            (fechaDate.getUTCFullYear().toString().substr(2, 2)) ;
    return fechaParseada;
  }

}
