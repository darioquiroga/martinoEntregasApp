import { timeout } from 'rxjs';
import { tiposErrores } from './../../shared/textos/tiposErrores';
import {  OnInit, Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CartaPorteHistoria } from 'src/app/modelo/cartaPorteHistoria';
import { Pipe } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';

import { BuscarCartaPorteService } from 'src/app/services/buscar-carta-porte.service';
import { textos } from 'src/app/shared/textos/textos';
import { DetalleCartaPortePage } from '../detalle-carta-porte/detalle-carta-porte.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-carta',
  templateUrl: './buscar-carta.page.html',
  styleUrls: ['./buscar-carta.page.scss'],
})
export class BuscarCartaPage implements OnInit {
  // Spinner
  loading: boolean = false;
  // Carta buscada bindeada en html
  nroCartaOPatenteBuscada: string = '';
  // Intervalo de fechas activo (badges que aparecen arriba)
  filtroFechas: { desde: Date; hasta: Date };
 // Texto buscado (esta bindeado con el input)
 inputSearchBar: string | undefined;
  // Textos
  buscaCartaTitulo = textos.buscarCarta.html.titulo;
  buscarCartaBtnBuscar = textos.buscarCarta.html.btnBuscar
  buscarCartaTipPatente = textos.buscarCarta.html.tipPatente
  buscarCartaTipNroCarta = textos.buscarCarta.html.tipNroCarta


  //  tiposErrores: any;
  constructor(
    private navCtrl: NavController,
    private buscarCartaPorteService: BuscarCartaPorteService,
    private uiService: UiService,
    private loadingController: LoadingController,
    private router: Router,


  ) {
    const ayer = new Date(Date.now() - 86400000); // that is: 24 * 60 * 60 * 1000
    this.filtroFechas = {
      desde: ayer,
      hasta: ayer,
    };
  }



  async onClickBuscar() {

    try {
      // Pongo el spinner
      this.loading = true;
      await this.uiService.presentLoading("Buscando");
      // await this.loadingController.dismiss();
      // Busco las cartas


      await this.buscarCartaPorteService
        .getCartaPorte(this.nroCartaOPatenteBuscada, this.filtroFechas)
        .then(async (cartasEncontradas: any) => {
          // Me fijo si trajo más de una

          await this.loadingController.dismiss();
          if (cartasEncontradas.data.length > 1) {

            // Mnando las cartas a mostrar en CartasEncontradasPage
            debugger
            this.router.navigateByUrl("/carta-porte-encontradas", {state: {cartasEncontradas: cartasEncontradas}})

          } else {
            debugger
            // encuen tra solo 1
            this.router.navigateByUrl("/detalle-carta-porte", {state: {cartasEncontradas: cartasEncontradas.data[0]}});
          }
        });
    } catch (err: any) {

      if (err.name == tiposErrores.timeoutError) {
        this.uiService.presentAlertInfo(
          'Error: ' +
            textos.buscarCarta.timeOutError.titulo +
            ': ' +
            textos.buscarCarta.timeOutError.descripcion
        );
      } else if (err.name === tiposErrores.unauthorized) {
        this.uiService.presentAlertInfo(
          'Error: ' +
            textos.buscarCarta.unauthorized.titulo +
            ': ' +
            textos.buscarCarta.unauthorized.descripcion
        );
      }else{
         // No hay cartas: En la descripcion del mensaje checkeo: Si NO es un número, es una patente.
         this.uiService.presentAlertInfo(textos.buscarCarta.noHayCartas.titulo+" - "+isNaN(parseInt(this.nroCartaOPatenteBuscada)) ?
         textos.buscarCarta.noHayCartas.descripcion.patente :
         textos.buscarCarta.noHayCartas.descripcion.nroCarta);

      }


    }
  }



  // Checkear si nroCartaBuscada tiene una letra (esto implicaría que es una patente, por lo cual debo mostrar las fechas de intervalo)
  checkIfIsPatente() {
    if (this.nroCartaOPatenteBuscada.match(/[a-z]/i)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    const usu = localStorage.getItem('usuarioActual')?.toString();

  }

}
