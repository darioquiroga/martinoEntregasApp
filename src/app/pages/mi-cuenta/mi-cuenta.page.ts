import { MiCuentaService } from './../../services/mi-cuenta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit {
  public claveActual: string | undefined;
  public claveNueva: string | undefined;
  public claveRepetida: string | undefined;
  public errorMsg: string | undefined;
  public cuenta: any;
  public socioNombre: any;
  public socioEmail: any;
  public datosUsuario: any;
  public datos: any;
  public cambiarClaveDatos : any;
  public respuesta: any
  istodoCargado = false;
  constructor(
    public miCuentaService: MiCuentaService,
    private route: ActivatedRoute,
    private uiService: UiService,
    private navController: NavController,
    private loadingController: LoadingController
  ) {}

  /**
   * Este metodo se ejecuta cuando el usuario presiona el botón iniciar
   */
  public async cambiarClave() {
    await this.uiService.presentLoading("Aguarde...");
    if (this.claveActual === null) {
      // Muestro mensaje de error

      this.errorMsg = 'Por favor ingrese la clave Actual';
      this.uiService.presentAlertInfo(this.errorMsg);
      await this.loadingController.dismiss();
    } else if (this.claveNueva === null) {
      // Muestro mensaje de error
      this.errorMsg = 'Por favor complete el campo clave nueva';
      this.uiService.presentAlertInfo(this.errorMsg);
      await this.loadingController.dismiss();
    } else if (this.claveRepetida === null) {
      // Muestro mensaje de error
      this.errorMsg = 'Por favor complete el campo clave repetida';
      this.uiService.presentAlertInfo(this.errorMsg);
      await this.loadingController.dismiss();
    } else if (this.claveNueva != this.claveRepetida) {
      this.errorMsg = 'Las claves (Nueva y Repetida) deben ser iguales';
      this.uiService.presentAlertInfo(this.errorMsg);
      await this.loadingController.dismiss();
    } else {
      // todo good ejecto el metodo de cambio de clave

       this.miCuentaService.cambiarClave(this.claveActual, this.claveNueva).then(
        async resp => {

          let obj = JSON.parse(JSON.stringify(resp));
          let codigo  = obj.respuesta.codigo;
          let descripcion = obj.respuesta.descripcion;

          if (resp) {

            this.uiService.presentAlertInfo(codigo+" : "+descripcion);
            this.navController.navigateRoot('logout', { animated: true });
          } else {

            this.uiService.presentAlertInfo(codigo+" : "+descripcion);



          }
          await this.loadingController.dismiss();

        }
      ).catch(

        async error => {
          this.uiService.presentAlertInfo(error);

        }
      );

await this.loadingController.dismiss();





    }

  }

  ngOnInit() {
    this.datos = localStorage.getItem('usuarioActual')?.toString();
    this.datosUsuario = JSON.parse(this.datos);
    this.cuenta = this.datosUsuario.cuenta.id;
    this.socioEmail = this.datosUsuario.cuenta.email;
    this.socioNombre = this.datosUsuario.cuenta.nombre;
    this.istodoCargado = true;
  }
}
