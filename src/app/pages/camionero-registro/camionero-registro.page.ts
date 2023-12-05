import { Component, OnInit } from '@angular/core';

import { App } from '@capacitor/app';
import { Camionero } from 'src/app/modelo/camionero';
import { UiService } from 'src/app/services/ui.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
//import { BuscarCamionPage } from '../buscar-camion/buscar-camion.page';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { textos } from 'src/app/shared/textos/textos';
@Component({
  selector: 'app-camionero-registro',
  templateUrl: './camionero-registro.page.html',
  styleUrls: ['./camionero-registro.page.scss'],
})
export class CamioneroRegistroPage implements OnInit {
  camionero: Camionero = new Camionero({nombre: '', celular: '', cuitEmpTrans: '', deviceId: ''});

// Spinner
  loading: boolean | undefined;
  constructor(

    private uiService: UiService,

    private menuCtrl: MenuController,

    private notificacionService: NotificacionesService,

    private loadingController: LoadingController,

  ) {


        this.notificacionService.getPushId().then(pushId => {
            //this.camionero.deviceId = pushId;
        });


   }

   txt_info = textos.registerCamionero.html.info;
   // TODO: Refactorear esto
    // Toma los datos de los inputs y registra el camionero a travez del service REST
    async onClickIngresar() {

      try {
          // Habilito el menu
          this.menuCtrl.enable(true);
          try {
              // Cargando
              this.loading = true;
              await this.uiService.presentLoading("Cargando...");
              // Checkeo que exista en la BD de AFIP el cuit de la empresa transportista ingresado
              //await this.authService.checkEmpTrans(this.camionero.cuitEmpTrans);
          }
          catch(err) {

              // Manejo posible error
             // const errorBody: {estado: number, descripcion: string} = JSON.parse(err['_body']);
            //  this.utilsService.showAlert('Cuit Incorrecto', errorBody.descripcion);
              this.loading = false;
              await this.loadingController.dismiss();
              // Retorno para q no siga en la funcion
              return;

          }

          // Registro camionero en la BD
          //await this.authService.setCamionero(this.camionero);
          // Fin carga
          this.loading = true;
          await this.uiService.presentLoading("Aguarde...");
          // Logueo al camionero
          //this.loginService.doLoginCamionero(this.camionero);
          // Redirijo a buscarCamionPage
          //this.app.getActiveNav().setRoot(BuscarCamionPage);
      }
      catch(err) {
          //console.log(err);

        /*  this.utilsService.showAlert(
              this.textos.erroresGenericos.timeOutError.titulo,
              this.textos.erroresGenericos.timeOutError.descripcion
              );
              */

          // const errorBody: {estado: number, descripcion: string} = JSON.parse(err['_body']);
          // console.log(errorBody);
      }
  }

  async ngOnInit() {
   // Pongo el spinner
  this.loading = true;
  //this.uiService.presentAlertInfo("Espere");
  await this.uiService.presentLoading("Aguarde...");
  this.loading = false;
  await this.loadingController.dismiss();
  }
}
