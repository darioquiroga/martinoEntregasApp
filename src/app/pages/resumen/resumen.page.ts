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
import { Mensajes } from 'src/app/modelo/mensajes';
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
   public notificaciones: any;
   public ver: boolean = false;
   public numeroMensajes: any;
   public intervalId: any;
   posicionCompletaDelDia : any;
   cantidadTodos: any = 0;
   cantidadIncidencias  : any = 0;
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
  // Mensajes de whats up para verificar si y ase envio o no
  mensajes: Mensajes[] = JSON.parse(localStorage.getItem('mensajes') || '[]');
  public mensajeEnviadoSn : string | undefined;
   // Necesario para asegurarse que el user no se desplaza hacia abajo (infiniteScrollTop)
   lastScrollTop: any;
  constructor(
    public posicionDiaService: PosicionDiaService,
    public responsiveTableService: ResponsiveTableService,
    public puertosService: PuertosService,
    private uiService: UiService,
    //public notificacionesService: NotificacionesService,
    private zone: NgZone,
    private platform: Platform,
    private navController: NavController,
    private loadingController: LoadingController,
    private menuController: MenuController,
    //public notificacionesService: NotificacionesService,
    private menuCtrl : MenuController,
    private router: Router
  ) { }
  iraIncidencias(){

    this.navController.navigateRoot('/resumen/incidencias');
  }


  iraTodos(){

    this.navController.navigateRoot('/resumen/todo');
  }
  ngOnInit() {
    if (!localStorage.getItem('reload')) {
      localStorage['reload'] = true;
      window.location.reload();
    } else {
      localStorage.removeItem('reload');
    }
    this.controlCarga();


   if (typeof this.usuarioActivoJson === 'string') {
    this.usuarioActivo =  JSON.parse(this.usuarioActivoJson);
    this.cargarCartas();
  }
  /*this.notificacionesService.ponerEnFalso();
  this.notificacionesService.checkPorVer().then(async (resp) => {
    this.data = resp;
    if (this.data > 0) {
      this.ver = true;
    } else {
      this.ver = false;
    }
    this.numeroMensajes = this.data;
  });*/


  }


controlCarga(){
  let count = 0;
  this.intervalId = setInterval(()=>{
    count++;
    //console.log("---->"+count)
    if (count == 20){
      this.loadingController.dismiss();
      clearInterval(this.intervalId)
      this.uiService.presentAlertInfo(textos.errorNoRespondeEnPoint.timeOutError.descripcion)
      this.navController.navigateRoot("/logout");
    }
  }, 1000);
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

            if (this.completeTableData){
            this.completeTableDataAutorizado = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Autorizado");
            this.completeTableDataIngreso = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Ingreso");
            this.completeTableDataDescargado = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Descargado");
            this.completeTableDataAdescargar = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "A Descargar");
            this.completeTableDataRechazados =  this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Rechazo");
            this.completeTableDataDemorados =   this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Demorado");
            this.completeTableDataDesviados =   this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Desviado");

            this.completeTableDataMostrar = this.completeTableDataAutorizado.concat(this.completeTableDataIngreso)
            .concat(this.completeTableDataDescargado)
            .concat(this.completeTableDataAdescargar)
             .concat( this.completeTableDataDesviados)

            //this.completeTableDataMostrar = this.completeTableData;
            this.completeTableDataMostrarIncidencias = this.completeTableDataRechazados.concat(this.completeTableDataDemorados)
            this.cantidadTodos = this.completeTableDataMostrar.length
            this.cantidadIncidencias =this.completeTableDataMostrarIncidencias.length

             // Obtengo los destinos para los filtros


            // await this.loadingController.dismiss();
            }else{
              this.uiService.presentAlertInfo("No hay cartas disponibles.")
            }
            clearInterval(this.intervalId)
           }) ;





         // fin posicion dia

     }
     catch(err) {

         alert(err)
         // Muestro error
         // this.uiService.presentAlertInfo(textos.erroresGenericos.timeOutError.titulo+": "+textos.erroresGenericos.timeOutError.descripcion);

     }
   }

   public graboMensajes(id: any, msg : any){

    const nuevoMensaje: Mensajes = { id: id, contenido:msg };
    this.mensajes.push(nuevoMensaje);
    localStorage.setItem('mensajes', JSON.stringify(this.mensajes));

  }


  deleteStorageMensaje() {
    localStorage.removeItem('mensajes');
  }

  public verificaMensajeEnviado (mensaje:any){
    const mensajesAlmacenados: Mensajes[] = JSON.parse(localStorage.getItem('mensajes') || '[]');

    for (var i = 0, len = mensajesAlmacenados.length; i < len; i++){
      if (mensaje == mensajesAlmacenados[i].contenido){
          this.mensajeEnviadoSn = "S";
      }else{
        this.mensajeEnviadoSn = "N";
        }
    }
  }


}
