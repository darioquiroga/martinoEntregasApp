import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CartaPosicionCamionero } from 'src/app/modelo/cartaPosicionCamionero';
import { LoadingController } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { BuscarCamionService } from 'src/app/services/buscar-camion-service';
import { Router } from '@angular/router';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { PuertosService } from 'src/app/services/puertos.service';
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
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
  cartaEncontrada: any[] = [] ;
  cartasEncontradas: CartaPosicionCamionero[] = [];
  completeTableDataMostrar :  CartaPortePosicion[] = [];
  cardTitulo : String = "";
  cardSubTitulo: String = "";
  constructor(
    public buscarCamionService: BuscarCamionService,
    private router: Router,
    private uiService: UiService,
    private loadingController: LoadingController,
    private puertosService : PuertosService,
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
async onClickEnviarWhatsUp(){
  let url = "";





}
 async onClickBuscar(){
  if (this.nroCartaOPatenteBuscada != ""){
    this.uiService.presentLoading("Buscando...")

    this.buscarCamionService.getCartaDePorteCamion(this.nroCartaOPatenteBuscada).then(
      async (resp: any)=>{

        this.cartaEncontrada = [];
       this.completeTableDataMostrar = [];
        await this.loadingController.dismiss(null);
          if (resp === ""){

            this.nroCartaOPatenteBuscada= ""
            this.uiService.presentAlertInfo("No se encontraron datos compatibles con su criterio de búsqueda.");

          }else{

            if (resp.data.length == 0){
              this.uiService.presentAlertInfo("No se encontraron datos compatibles con su criterio de búsqueda.");

            }else{

              let response = JSON.parse(JSON.stringify(resp.data));
              this.cartaEncontrada = response
              this.completeTableDataMostrar = this.cartaEncontrada;
              this.cardTitulo = String(this.completeTableDataMostrar[0].nroCarta);
              this.cardSubTitulo = String(this.completeTableDataMostrar[0].destino.descripcion)

            }
            this.nroCartaOPatenteBuscada= ""
             this.loadingController.dismiss(null);
           }


      },
      (error: any) => {

       this.uiService.presentAlertInfo("Error: "+error);


      })

  }




}




// Abre o cierra la info extra de una carta de porte

  ngOnInit() {

  }

}
