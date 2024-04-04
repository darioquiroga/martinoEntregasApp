import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CartaPosicionCamionero } from 'src/app/modelo/cartaPosicionCamionero';
import { LoadingController, NavController } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { BuscarCamionService } from 'src/app/services/buscar-camion-service';
import { Router } from '@angular/router';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { PuertosService } from 'src/app/services/puertos.service';
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { MaskitoOptions } from '@maskito/core';
import { Configuraciones } from 'src/app/shared/constants/configuraciones';
import { MensajeriaService } from 'src/app/services/mensajeria.service';

@Component({
  selector: 'app-buscar-camion',
  templateUrl: './contactar-con-entregador.html',
  styleUrls: ['./contactar-con-entregador.scss'],
})
export class ContactarConEntregadorPage implements OnInit {
// Spinner
  loading: boolean = false;
  nroCelularDestino:  string = '';
  msg: string = '';
  // Martino
  tokenWapi = "a441bd60784918d8bd65e5d7d21b91148f5ee307";
  // Avellaneda
  //tokenWapi = "33b8c0ae0e9b533d97eddd7f58087ff308276407";
  // Estados de cartas expandidas o contraidas
  estadosToggleCarta: boolean[] = [];
  cartaEncontrada: any[] = [] ;
  cartasEncontradas: CartaPosicionCamionero[] = [];
  completeTableDataMostrar :  CartaPortePosicion[] = [];
  cardTitulo : String = "";
  cardSubTitulo: String = "";
  nombreEngregador: String = ""
  maskPredicate: any;
  error = false
  mostrar = 0;
  procesoCompleto = false;
  constructor(
    public buscarCamionService: BuscarCamionService,
    private router: Router,
    private uiService: UiService,
    private loadingController: LoadingController,
    private puertosService : PuertosService,
    private navController: NavController,
    private mensajeriaService: MensajeriaService,
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

 async onClickContactarEntregador(){
  let err  = 0;
  let enviados = 0
  let idInterval = 0;
  if (this.nroCelularDestino == "" || this.msg == ""){
    this.uiService.presentAlertInfo("Debe ingresar un número válido y un mensaje")
  }else{

      let i =0;
      let r = 0;
      const celu_1 = Configuraciones.celu_1;
      const celu_2 = Configuraciones.celu_2;
      const celu_3 = Configuraciones.celu_3;
      const celu_da = Configuraciones.celu_da;
      //const celu_su = Configuraciones.celu_su;
      const celu_her =Configuraciones.celu_her;

      let celulares: number[] = [celu_1,celu_2,celu_3,celu_da ,celu_her ];
      let cantidadCelulares = celulares.length
      let codigoReferencia = this.generaCodigoAleatorio();
      const fechaHora = new Date();
      this.uiService.presentLoading("Enviando mensaje, aguarde un momento.")
      let mensaje = "SOLICITUD LLAMADO - Solicitante: "+this.nroCelularDestino+":  Dice: "+this.msg+" - "+fechaHora.toLocaleDateString()+" "+fechaHora.toLocaleTimeString()

    for (let celu in celulares) {
      await this.mensajeriaService.enviarMensajeWhatsUWapi(celulares[i], mensaje).then(function(resp:any) {
        const respuesta = JSON.stringify(resp);
        const data = JSON.parse(respuesta);
        if(data.respuesta == false){

          err = err +1;
        }else{
          enviados = enviados+1
      }
      }, function(reason) {


      });
      i++;
    }

    let idInterval = setInterval(() => {
      if (enviados >= celulares.length){
        clearInterval(idInterval);
        this.loadingController.dismiss(null)
        this.loadingController.dismiss(null)
        this.procesoCompleto = true
        this.uiService.presentAlertInfo("Su mensaje fue entregado exitosamente, aguarde a ser contactado por el entregador.")
        this.msg = ""
        this.nroCelularDestino = "";
        this.navController.navigateRoot('/buscar-camion', { animated: false });
      }
      if (err > 0){
        clearInterval(idInterval);
        this.loadingController.dismiss(null)
        this.procesoCompleto= false;
        this.uiService.presentAlertInfo("Error, ocurrio un error inesperado al enviar el mensaje, intente nuevamente más tarde.")
        this.msg = ""
        this.nroCelularDestino = "";
        this.navController.navigateRoot('/buscar-camion', { animated: false });

      }
    r++
    }, 1000);






  }


}

generaCodigoAleatorio() {
  let result = '';
  //const characters = 'ABCDEFGHIJKLMNOPQuvwxyz0123456789';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
async onClickBuscar(){
  if (this.nroCelularDestino != ""){
    this.uiService.presentLoading("Buscando...")
    /*14423383*/
      this.buscarCamionService.getCartaDePorteCamion(this.nroCelularDestino).then(
      async (resp: any)=>{
      this.cartaEncontrada = [];
       this.completeTableDataMostrar = [];
        await this.loadingController.dismiss(null);
          if (resp === ""){
            this.nroCelularDestino= ""
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
            this.nroCelularDestino= ""
             this.loadingController.dismiss(null);
           }


      },
      (error: any) => {

       this.uiService.presentAlertInfo("Error: "+error);


      })

  }




}


 phoneMask: MaskitoOptions = {
  mask: ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

readonly cardMask: MaskitoOptions = {
  mask: [
    ...Array(4).fill(/\d/),
    ' ',
    ...Array(4).fill(/\d/),
    ' ',
    ...Array(4).fill(/\d/),
    ' ',
    ...Array(4).fill(/\d/),
    ' ',
    ...Array(3).fill(/\d/),
  ],
};

// Abre o cierra la info extra de una carta de porte

  ngOnInit() {
    this.nombreEngregador = Configuraciones.nombreEntregador
    localStorage.setItem('tokenWappi', this.tokenWapi);


  }

}
