import { Component,   NgZone, OnInit, ViewChild, inject } from '@angular/core';

import {  IonContent, IonFab, LoadingController, MenuController, NavController, Platform  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// Constantes y otros
import { estadosCartaPosicion } from '../../shared/constants/estadosCartaPorte';
import { estadosCartaPosicionPuertos } from '../../shared/constants/estadosCartaPorte';
import { Router } from '@angular/router';
// Modelos
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { Usuario } from 'src/app/modelo/usuario';

// Services
import { PosicionDiaService } from 'src/app/services/posicion-dia.service';
import { UiService } from 'src/app/services/ui.service';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { PuertosService } from 'src/app/services/puertos.service';
import { textos } from 'src/app/shared/textos/textos';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
   completeTableData :   CartaPortePosicion[] = [];
  completeTableDataDescargado :  CartaPortePosicion[] = [];
   completeTableDataAdescargar :  CartaPortePosicion[] = [];
   completeTableDataAutorizado :  CartaPortePosicion[] = [];
   completeTableDataIngreso :  CartaPortePosicion[] = [];
   completeTableDataMostrar :  CartaPortePosicion[] = [];
   completeTableDataMostrarIncidencias :  CartaPortePosicion[] = [];
   completeTableDataRechazados:  CartaPortePosicion[] = [];
   completeTableDataDemorados:  CartaPortePosicion[] = [];
   completeTableDataDesviados:  CartaPortePosicion[] = [];
   posicionCompletaDelDia : any;
   cantidadTodos: any;
   cantidadIncidencias  : any;
   // Cantidad de camiones en posición
   tituloCantidad: string | undefined;
   // Filtros activos (badges que aparecen arriba del seachBar)
   activeFilters: { estado: string; destino: string; } | any;
   filtroEstado: String  | undefined;
   filtroDestino: String | undefined;
   // Lista con todo los estados de las cartas
   estadosList: string[] = [];
   // Lista con todos los destinos de las cartas
   destinosList: string[] = [];
   // Guardo el usuario activo en una variable
   usuarioActivo: Usuario | any;

   // Necesario para asegurarse que el user no se desplaza hacia abajo (infiniteScrollTop)
   lastScrollTop: any;
  constructor(
    public posicionDiaService: PosicionDiaService,
    public responsiveTableService: ResponsiveTableService,
    public puertosService: PuertosService,
    private uiService: UiService,
    private zone: NgZone,
    private platform: Platform,
    private navController: NavController,
    private loadingController: LoadingController,
    private menuController: MenuController,
    //public notificacionesService: NotificacionesService,
    private menuCtrl : MenuController,
    private router: Router
  ) { }

  ngOnInit() {

    if (typeof this.usuarioActivoJson === 'string') {
      this.usuarioActivo =  JSON.parse(this.usuarioActivoJson);
      this.cargarCartas();
    }



  }



  async cargarCartas() {
     try {

         // Guardo la lista de estados para filtrar (varia si es puertos o cerealnet)
         /*this.estadosList = this.posicionDiaService.formatEstadosCartaPosicion(
             this.puertosService.getIfPuertos() ?
                 estadosCartaPosicionPuertos : estadosCartaPosicion
         );*/

         // Obtengo posición del día


         this.posicionDiaService.getPosicionDia().then(
           async resp => {

             const respuesta = JSON.stringify(resp);


             const data = JSON.stringify(resp);
             this.completeTableData = JSON.parse(data).data ;

             // Guardo la cantidad en posicion (Posicion del dia)


            // Guardo una parte parcial de la tabla completa (lazy load)


            this.completeTableDataAutorizado = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Autorizado");
            this.completeTableDataIngreso = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Ingreso");
            this.completeTableDataDescargado = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Descargado");
            this.completeTableDataAdescargar = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "A Descargar");
            this.completeTableDataRechazados =  this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Rechazado");
            this.completeTableDataDemorados =   this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Demorado");
            this.completeTableDataDesviados =   this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Desviado");

            this.completeTableDataMostrar = this.completeTableDataAutorizado.concat(this.completeTableDataIngreso)
            .concat(this.completeTableDataDescargado)
            .concat(this.completeTableDataAdescargar)
            this.completeTableDataMostrarIncidencias = this.completeTableDataRechazados.concat(this.completeTableDataDemorados)
            .concat(this.completeTableDataDesviados)
            this.cantidadTodos = this.completeTableDataMostrar.length
            this.cantidadIncidencias =this.completeTableDataMostrarIncidencias.length

             // Obtengo los destinos para los filtros


             await this.loadingController.dismiss();
           }) ;





         // fin posicion dia

     }
     catch(err) {
         console.log(err);
         // Muestro error
         /*this.textos.erroresGenericos.timeOutError.titulo +
           this.textos.erroresGenericos.timeOutError.descripcion*/
         this.uiService.presentAlertInfo(textos.erroresGenericos.timeOutError.titulo+": "+textos.erroresGenericos.timeOutError.descripcion);

     }
   }

   onClickIncidencias() {
    alert("click")
    this.router.navigateByUrl('/incidencias');
  }
}
