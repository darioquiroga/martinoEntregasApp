import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Http } from '@capacitor-community/http';
import { Configuraciones } from '../../app/shared/constants/configuraciones';
import { Usuario } from 'src/app/modelo/usuario';
import { Cuenta } from 'src/app/modelo/cuenta';
import { Login } from 'src/app/modelo/login';
import { StorageService } from './storageService';
import { IonRefresher } from '@ionic/angular';
import { Observable, timeout } from 'rxjs';
//import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public usuarioActual: Usuario | any;
  public usuarioToken: Usuario | any;
  public esPuertosSn: boolean | false = false;
  public usuarioGrabado: Usuario | any;
  public logueado: boolean = false;
  public static instancia: LoginService;

  public servicioDisponible = false;
  public static conexion: any;
  public cuenta: Cuenta | any;
  public versionServicio: string | any;
  public versionCerealnet: string | any;
  public configuraciones = Configuraciones;
  public msgLoginRepuesta: string | any;
  public timeOut: any;
  constructor(
    private http: HttpClient,
    //private notificacionService: NotificacionesService
  ) //private storageService: StorageService,
  {}

  //  this.http.setServerTrustMode('nocheck')
  async loginUser(login: Login, remember?: boolean) {
    // Checkeo si es cerealnet o puertos
    const isPuertos = login.usuario[0] === '*';

    // Mando el pushId al login y mando un evento para activar el modo de notificacion del usaurio
    const pushId: string = '0';//await this.notificacionService.getPushId();
    // Me logueo y obtengo los datos de logueo
    //const dataLogin = await this.authService.login(usuario, clave, pushId, isPuertos);

    return new Promise(async (resolve, reject) => {
      try {

        const cleanUser =  isPuertos ? login.usuario.substring(1) : login.usuario
        const hash = login.clave; //CryptoJS.MD5(login.clave);
        const url = this.getURLServicio(login.usuario);
        const params = { pushId: pushId};
        const httpOptions = {
          headers: new HttpHeaders({
            clave: hash.toString(),
          }),
        };

        this.http.post(url, params, httpOptions).subscribe({
          next: (data: any) => {
            // data is already a JSON object

            if (data.token != '') {

              this.usuarioActual = data.usuario;
              this.usuarioActual = new Usuario(this.usuarioActual, isPuertos);
              this.usuarioToken = isPuertos ? data.acceso.token : data.token;
              this.esPuertosSn = isPuertos;
              this.saveStorage('usuario', this.usuarioActual);
              this.saveStorage('token', this.usuarioToken);
              this.saveStorage('esPuertosSn', this.esPuertosSn);
              this.saveStorage('tokenWappi', data.tokenWAPPI);
              this.saveStorage('AutorizadorNombre', data.nombre);
              this.saveStorage('AutorizadorCelular', data.celular);
              this.saveStorage('AutorizadorDni', data.dni);
              this.logueado = true;
              resolve(this.logueado);
            } else {
              resolve(false);
              reject(this.usuarioActual.control?.descripcion ?? 'Error al autenticar.');
            }
           // resolve(this.usuarioActual);
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
  }


  recuperarClave(login: Login) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = this.getURLRecuperarClave(login.usuario);
        const params = {};
        const httpOptions = {};

        this.http.post(url, params, httpOptions).subscribe({
          next: (data: any) => {
            if (data.control.codigo == 'OK') {
              resolve({ email: data.control.descripcion });
            } else {
              resolve(null);
            }
          },
          error: (error: any) => {
            reject(error);
          },
        });
      } catch (error: any) {
        alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
        const dataError = JSON.parse(error.error);
        reject(dataError.control.descripcion);
      }
    });
  }

  /*
    Éste método valida que se pueda hacer login con las credenciales guardadas.
    devuelve true o false según se pudo o no.
  */
  async trySavedLogin() {
    //return new Promise(async (resolve, reject) => {
    //  try {

    let credenciales: any = localStorage.getItem('usuarioActual');
    this.usuarioActual = localStorage.getItem('usuarioActual');
    let credencialesToken: any = localStorage.getItem('token');
    this.usuarioGrabado = JSON.parse(credenciales);
    this.usuarioToken = JSON.parse(credencialesToken);
    const isPuertos = false;
    this.esPuertosSn = isPuertos;
    const today = new Date();

    const fechaHoy = today.toDateString();
    if (this.usuarioToken  != null && this.usuarioGrabado != '' ) {
      return new Promise(async (resolve, reject) => {

        let parametros: URLSearchParams = new URLSearchParams();
        parametros.set('token', this.usuarioToken);
        resolve(true);

        try {
          const url =
            `${this.getUrlTestToken(this.usuarioGrabado.cuenta.id)}?` +
            parametros;
          const params = { parametros };
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              token: this.usuarioToken,
            }),
          };

          this.http.get(url, httpOptions).subscribe((resp: any) => {
            let control = resp.estado;

            if (control.codigo == 'OK') {
              // si no tiene permiso  lo pateo

              this.versionCerealnet = control.versionLib;
              this.versionServicio = control.version;
              this.usuarioActual = this.usuarioGrabado;

              this.logueado = true;
            } else {
              this.logueado = false;
            }
          });
        } catch (error: any) {
      //   alert("Ocurrio un error inesperado")
          // const dataError = JSON.parse(error.error);
         // reject(dataError.control.descripcion);
        }
      });

      /*

              */
    } else {
      this.logueado = false;


      // no hay credenciales asi que lo mando a pantalla de login
    }
    //this.loginUser();

    /*} catch (error: any) {
          debugger
          alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
          const dataError = JSON.parse(error.error);
          reject(dataError.control.descripcion);
        }*/
    // });
  }

  public logout(): void {
    // Seteo el usuario actual en null
    this.usuarioActual = null;
    this.deleteStorage();
    // Seteo la bandera como deslogueado
    this.logueado = false;
  }

  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLServicio(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.authUrl + usuario;

  }


  /**
   * Esta funcion devuelve la URL del servicio
   */
  private getURLRecuperarClave(usuario: string) {
    // Por ahora devuelvo el string como esta, despues hay que usar el token
    return Configuraciones.authUrl + usuario + '/recuperarClave';
  }

  saveStorage(queGrabo: string, obj: any) {
    if (queGrabo == 'token') {
      localStorage.setItem('token', JSON.stringify(obj));
    } else if (queGrabo == 'usuario') {
      localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
    } else if (queGrabo == 'tokenWappi') {
      localStorage.setItem('tokenWappi', obj);

    } else if (queGrabo == 'AutorizadorNombre') {
      localStorage.setItem('AutorizadorNombre', obj)
    } else if (queGrabo == 'AutorizadorCelular') {
      localStorage.setItem('AutorizadorCelular',obj)
    } else if (queGrabo == 'AutorizadorDni') {
      localStorage.setItem('AutorizadorDni', obj)
    }


  }
  deleteStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('tokenWappi');
    localStorage.removeItem('AutorizadorNombre');
    localStorage.removeItem('AutorizadorCelular');
    localStorage.removeItem('AutorizadorDni');
    localStorage.removeItem('mensajes');
    localStorage.clear();
  }

  public getUrlTestToken(usuario: string): string {
    return Configuraciones.authUrl + usuario + '/testToken';
  }

  public validarServicioSiEstaDisponible() {
    console.log('Valido servicio -> ' + this.getURLDummy());
    const url = `${this.getURLDummy()}`;
    const httpOptions = {
      headers: new HttpHeaders({}),
    };
    this.http
      .get(url)
      .pipe()
      .subscribe((resp) => {
        this.servicioDisponible = true;
      });
  }
  catch(error: any) {
    const dataError = JSON.parse(error.error);
    this.servicioDisponible = false;
  }

  /**
   * Esta funcion devuelve la URL del recurso Dummy
   */
  private getURLDummy() {
    return Configuraciones.dummyUrl;
  }
}
