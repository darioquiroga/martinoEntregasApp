import { Injectable } from "@angular/core";
import { Configuraciones } from 'src/app/shared/constants/configuraciones';
import { Notificacion } from "../modelo/notificacion";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Platform } from "@ionic/angular";
@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {
    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public static URLSERVICIO: string = Configuraciones.notificacionesUrl;
    public notificaciones: Notificacion[] = [];
    public flag: boolean = false;
    public ver: boolean = false;
    public numeroMensajes: any ;
  public cuenta : any;
  public datos : any;
    usuarioActual: any;
  oneSignal: any;

    //---------------------------------------------//

    // Metodo constructor
    constructor(public http: HttpClient,
    // private oneSignal: OneSignal,
        private platform: Platform) { }

    public async load() {

        this.datos = localStorage.getItem('usuarioActual')?.toString();
        this.usuarioActual = JSON.parse(this.datos);
        this.cuenta = this.usuarioActual.cuenta.id;
       // debugger
        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.getURLServicio()}`;
                const httpOptions = {
                    headers: new HttpHeaders({
                        token: this.usuarioActual.token.hashId,
                    }),
                };

                this.http.get(url, httpOptions).subscribe((data: any) => {
                    let control = data.control;
                    debugger
                    if (control.codigo == "OK") {
                        this.notificaciones = data.datos.mensajes;
                        resolve(
                            {
                                notificaciones: this.notificaciones
                            });
                    }
                });
            } catch (error: any) {
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });
    }
    public checkPorVer() {
       const usuarioActualStr = localStorage.getItem('usuarioActual');
       if (usuarioActualStr) {
           this.usuarioActual = JSON.parse(usuarioActualStr);
       }

       return new Promise(async (resolve, reject) => {
           try {
               const url = `${this.getURLServicio()}/ver`;
               const httpOptions = {
                   headers: new HttpHeaders({
                       token: this.usuarioActual.token.hashId,
                   }),
               };

               this.http.get(url, httpOptions).subscribe((data: any) => {
                   let control = data.control;
                   if (control.codigo == "OK") {
                    this.flag = true;
                    this.numeroMensajes = Number(control.descripcionLarga);



                    resolve( this.numeroMensajes);
                   } else {
                    this.ver = false;
                    this.numeroMensajes = 0;
                   }
               });
           } catch (error: any) {
              console.log("fallaron en buscar los no vistos");
               const dataError = JSON.parse(error.error)
               reject(dataError.control.descripcion);

               this.numeroMensajes = 0;
               resolve( this.numeroMensajes)
           }
       });



  }
  // Retorna el id del usuario para mandar las notificaciones push
    // Esta es necesaria para mandar notificaciones individuales
    async getPushId() {
      if (this.platform.is('cordova')) {
          // Me conecto a one signal
          //this.connectOneSignal();
          // Retorno el id del dispositvio de oneSignal
          //return (await this.oneSignal.getIds()).userId;
          return "connectedByBrowser";
      } else {
          return 'connectedByBrowser';
      }
  }
  connectOneSignal() {
   /* this.oneSignal.startInit(Configuraciones.oneSignalCredenciales.appId, Configuraciones.oneSignalCredenciales.googleProjectnumber);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe(() => {});
    this.oneSignal.handleNotificationOpened().subscribe(() => {});
    this.oneSignal.endInit();*/
}
    public ponerEnFalso() {
     // alert("ponerEnFalso")
      this.ver = false;
      this.numeroMensajes = 0;
    }
    public async borrarNotificacion(idMensaje: number) {
        const usuarioActualStr = localStorage.getItem('usuarioActual');
        if (usuarioActualStr) {
            this.usuarioActual = JSON.parse(usuarioActualStr);
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.getURLServicio()}/borrar`;
                const httpOptions = {
                    headers: new HttpHeaders({
                        token: this.usuarioActual.token.hashId,
                        idMensaje: idMensaje
                    }),
                };
                const bodyOptions = {
                  token: this.usuarioActual.token.hashId,
                  idMensaje: idMensaje
                }

                this.http.post(url,bodyOptions, httpOptions).subscribe((data: any) => {
                    let control = data.control;
                    if (control.codigo == "OK") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error: any) {
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });
    }

    public async vistearMensaje(idMensaje: number) {
        const usuarioActualStr = localStorage.getItem('usuarioActual');

        if (usuarioActualStr) {
            this.usuarioActual = JSON.parse(usuarioActualStr);
        }

        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.getURLServicio()}/visto`;
                const httpOptions = {
                  headers: new HttpHeaders({
                    token: this.usuarioActual.token.hashId,
                    idMensaje: idMensaje
                })
                };
                const bodyOptions = {
                  token: this.usuarioActual.token.hashId,
                  idMensaje: idMensaje
                }
                this.http.post(url, bodyOptions, httpOptions).subscribe((data: any) => {
                    let control = data.control;
                    if (control.codigo == "OK") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            } catch (error: any) {
                const dataError = JSON.parse(error.error)
                reject(dataError.control.descripcion);
            }
        });
    }

    /**
    * Esta funcion devuelve la URL del servicio
    */
    private getURLServicio() {
        // Por ahora devuelvo el string como esta, despues hay que usar el token
        return NotificacionesService.URLSERVICIO + `${this.usuarioActual.cuenta.id}`;

    }
}
