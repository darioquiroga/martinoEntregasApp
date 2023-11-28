import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Configuraciones } from 'src/app/shared/constants/configuraciones';
import { tipoSesion } from './shared/constants/tipoSesion';
import { StorageService } from './services/storageService';
import { modosNotificacion } from './shared/constants/modosNotificacion';
import { Observable, Subject } from 'rxjs';
import { VariableBinding } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public usuarioActivo: { tipo: string; nombre: string; } | undefined;



  constructor(private platform: Platform, private router: Router) {
    this.initializeApp();
  }

  // Mantengo actualizado este json acá en el javascript
  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  public notificacionesMostrar = false;
  public descargaMostrar = false;
  public appPages = [
    { title: 'Posición de día', url: '/resumen', icon: 'calendar' },

    //{ title: 'Buscar Carta', url: '/buscar-carta', icon: 'search' },

  ];
  public temp = '';
  public labels = ['etiquetas 1', 'etiqueta 2'];
  initializeApp() {

    this.platform.ready().then(() => {
      this.refreshUsuarioActivo();
    });

  }

  // Subcjet del tipo de sesion. A través de este se observará cambios en el tipo de sesion
  private tipoSesion$ = new Subject<string>();

  // Cambia el tipo de sesion
  setTipoSesion(tipoSesion: string) {
    this.tipoSesion$.next(tipoSesion);
  }

  // Obtiene el tipo de sesion como un observable
  getTipoSesion$(): Observable<string> {
    return this.tipoSesion$.asObservable();
  }

  refreshUsuarioActivo() {

    if (typeof this.usuarioActivoJson === 'string') {
      const usuario = JSON.parse(this.usuarioActivoJson);
      if (usuario.tipo.id == 1){
        this.notificacionesMostrar = false;
      }else{
        this.notificacionesMostrar = true;
      }

      this.getTipoSesion().then((tipo) => {

        // Si tipo es nromal, entonces el usaurio logueadoe es normal
        if (
          tipo === tipoSesion.NORMAL ||
          tipo === tipoSesion.PUERTOS ||
          tipo === tipoSesion.INVITADO
        ) {
          this.usuarioActivo = {
            tipo: usuario.tipo.descripcion,
            nombre: usuario.nombre,
          };
        } else {
          // Sino, es tipo invitado (camionero)
          this.usuarioActivo = {
            tipo: tipoSesion.INVITADO,
            nombre: usuario.nombre,
          };
        }
      });
    }
  }

  // Retorno el tipo de sesion (normal o camionero) (tipo de usuario logueado)
  async getTipoSesion() {

    if (typeof this.usuarioActivoJson === 'string') {
      const usuario = JSON.parse(this.usuarioActivoJson);
      if (usuario) {
        if (usuario.idUsuario) {
          return tipoSesion.NORMAL;
        } else {
          // Checkeo si es puertos
          if (usuario.tipo.id === usuario.PUERTOS) {
            return tipoSesion.PUERTOS;
          } else {
            return tipoSesion.INVITADO;
          }
        }
      } else {
        return tipoSesion.NO_USER;
      }
    }else{
      return "";
    }
  }

  /**
   * @description // Obtiene los toggles iniciales cuando se loguea el usuario
   */
  async getInitToggles() {
    // Creo el objeto a retornar (por dfecto queda modonotificacion none)
    if (typeof this.usuarioActivoJson === 'string') {
      const usuarioActivo = JSON.parse(this.usuarioActivoJson);
      let toggles = {
        togglePush: false,
        toggleMail: false,
      };

      // Obtengo el modo de notificacion del user activo

      const modoNotificacion = usuarioActivo.modoNotificacion;

      // Si es push o push and mail, togglepush tiene q ser true
      if (
        modoNotificacion === modosNotificacion.PUSH ||
        modoNotificacion === modosNotificacion.PUSH_AND_MAIL
      ) {
        toggles.togglePush = true;
      }

      // Si es mail o push and mail, togglemail tiene q ser true
      if (
        modoNotificacion === modosNotificacion.MAIL ||
        modoNotificacion === modosNotificacion.PUSH_AND_MAIL
      ) {
        toggles.toggleMail = true;
      }
      // Retorno los toggles y el modoNotificacion
      return { toggles: toggles, modoNotificacion: modoNotificacion };
    } else {
      return '';
    }
  }

  onClickDescarga() {
    this.router.navigateByUrl('/descarga');
  }
  onClickSalir() {
    this.router.navigateByUrl('/logout');
  }
  onClickPoliticas() {
    this.router.navigateByUrl('/politica');
  }
  onClickCamionesDescarga() {

    this.router.navigateByUrl( 'https://martinoentregas.com.ar/posicion-de-camiones/');
  }
}
