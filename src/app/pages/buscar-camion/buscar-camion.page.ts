import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CartaPosicionCamionero } from 'src/app/modelo/cartaPosicionCamionero';
import { LoadingController } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { BuscarCamionService } from 'src/app/services/buscar-camion-service';
import { Router } from '@angular/router';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
@Component({
  selector: 'app-buscar-camion',
  templateUrl: './buscar-camion.page.html',
  styleUrls: ['./buscar-camion.page.scss'],
})
export class BuscarCamionPage implements OnInit {
// Spinner
  loading: boolean = false;
  nroCartaOPatenteBuscada:  string = '';
  // Estados de cartas expandidas o contraidas
  estadosToggleCarta: boolean[] = [];
  completeTableData: any;
  cartasEncontradas: CartaPosicionCamionero[] = [];
  constructor(
    public buscarCamionService: BuscarCamionService,
    private router: Router,
    private uiService: UiService,
    private loadingController: LoadingController,
    public responsiveTableService: ResponsiveTableService
  ) { }
// Checkear si nroCartaBuscada tiene una letra (esto implic""aría que es una patente, por lo cual debo mostrar las fechas de intervalo)
checkIfIsPatente() {
 /* if (this.nroCartaOPatenteBuscada.match(/[a-z]/i)) {
    return true;
  } else {
    return false;
  }*/
}
 async onClickBuscar(){
  if (this.nroCartaOPatenteBuscada != ""){
    this.uiService.presentLoading("Buscando...")
    this.buscarCamionService.getCartaDePorteCamion(this.nroCartaOPatenteBuscada).then(
      async (resp: any)=>{

          if (resp === ""){
            await this.loadingController.dismiss();
            this.nroCartaOPatenteBuscada= ""
            this.uiService.presentAlertInfo("No se encontraron datos compatibles con su criterio de búsqueda.");

          }else{

            if (resp.data.length == 0){
              this.uiService.presentAlertInfo("No se encontraron datos compatibles con su criterio de búsqueda.");
            }else{
              debugger
              let response = JSON.parse(JSON.stringify(resp.data));
              this.completeTableData = response
            }
            this.nroCartaOPatenteBuscada= ""
            await this.loadingController.dismiss();
           }


      },
      (error: any) => {

       this.uiService.presentAlertInfo("Error: "+error);


      })
  }




}
  ngOnInit() {

  }

}
