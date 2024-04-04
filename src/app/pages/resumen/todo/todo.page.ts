import { AppComponent } from './../../../app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Component,   NgZone, OnInit, ViewChild, inject } from '@angular/core';

import {  IonContent, IonFab  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// Constantes y otros
import { estadosCartaPosicion } from '../../../shared/constants/estadosCartaPorte';
import { estadosCartaPosicionPuertos } from '../../../shared/constants/estadosCartaPorte';

// Modelos
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { Usuario } from 'src/app/modelo/usuario';

// Services
import { PosicionDiaService } from 'src/app/services/posicion-dia.service';
import { UiService } from 'src/app/services/ui.service';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { PuertosService } from 'src/app/services/puertos.service';




// textos
import { textos } from 'src/app/shared/textos/textos';
import {
  LoadingController,
  MenuController,
  NavController,
  Platform,
} from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,


} from '@capacitor/push-notifications';

//import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Configuraciones }  from '../../../shared/constants/configuraciones';
import * as _ from 'lodash';
import { async } from 'rxjs';


//import { posicionDiaAnimations } from './posicionDiaAnimations';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],

})
export class Todopage implements OnInit {

  // Content para scrollear al bottom
  @ViewChild(IonContent)
  content!: IonContent;
  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
// Spinner
  loading: boolean = false;
  public seccion!: string;
  data: any;
  resumen: any;
  empresa: any;
  logo: any;
  nombreEmpresa : string | null = "";
  emailEmpresa  : string | null = "";
  direccionEmpresa  : string | null = "";
  telefonoEmpresa  : string | null = "";
  cerealnetVersion : String | null = "";
  cerealnetUrl : String | null = "";
  txtNadaEnPosicion: String | null = "";
  txtNadaEnBusqueda : String | null = "";
  private activatedRoute = inject(ActivatedRoute);
  istodoCargado : any
  public esPuertosSn: any;
  //public notificaciones: any;
  public ver: boolean = false;
  public numeroMensajes: any;
  public intervalId: any;
  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  // Estado de la busqueda, si esta activa o no
   busquedaActiva: boolean | false = false;
   // Texto buscado (esta bindeado con el input)
   inputSearchBar: string | undefined;;
   // Estados de cartas expandidas o contraidas
   estadosToggleCarta: boolean[] | any;
   // Tabla de cartas mutada (filtrada, achicada, etc)
   //parcialTableData: CartaPortePosicion[] = [];
   parcialTableData: any[] = [] ;
   // Tabla de cartas inicial completa
   completeTableData :  CartaPortePosicion[] = [];
   // Tabla estado autorizado

   completeTableDataDescargado :  CartaPortePosicion[] = [];
   completeTableDataAdescargar :  CartaPortePosicion[] = [];
   completeTableDataAutorizado :  CartaPortePosicion[] = [];
   completeTableDataIngreso :  CartaPortePosicion[] = [];
   completeTableDataMostrar :  CartaPortePosicion[] = [];
   completeTableDataDesviados : CartaPortePosicion[] = [];
   completeTableDataRechazados :  CartaPortePosicion[] = [];
   completeTableDataDemorados :  CartaPortePosicion[] = [];
   posicionCompletaDelDia : any;
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



  ) {


  }

  async ngOnInit() {


    // refresco la pagina por el cache
    this.menuCtrl.enable(true);
    this.cerealnetVersion = Configuraciones.version;
    this.cerealnetUrl = Configuraciones.urlBase;
    this.nombreEmpresa =textos.login.html.cerealnet.nombre;
    this.emailEmpresa = textos.login.html.cerealnet.mail;
    this.direccionEmpresa = textos.login.html.cerealnet.direccion;
    this.telefonoEmpresa = textos.login.html.cerealnet.telefono;
    this.txtNadaEnPosicion = textos.posicionDia.html.nadaEnPosicion;
    this.txtNadaEnBusqueda = textos.posicionDia.html.nadaEnBusqueda;
    this.istodoCargado = false
    this.seccion = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.filtroEstado = "";
    this.filtroDestino = "";
    /**this.notificacionesService.ponerEnFalso();
    this.notificacionesService.checkPorVer().then(async (resp) => {
      this.data = resp;
      if (this.data > 0) {
        this.ver = true;
      } else {
        this.ver = false;
      }
      this.numeroMensajes = this.data;
    }); */

    this.controlCarga()
    this.initTable();





  }
// Inicializa la tabla
async initTable() {
  // Pongo el spinner
  this.loading = true;
  //this.uiService.presentAlertInfo("Espere");
  await this.uiService.presentLoading("Aguarde...");
  // Seteo un titulo por default
  this.tituloCantidad = `Posicion del día`;
  // Busco la posicion y refresco
  await this.refreshTable();
  // Saco el spinner
  this.loading = false
  //this.uiService.dissmiss();



}

controlCarga(){

  let count = 0;
  this.intervalId = setInterval(()=>{
    count++;
   // console.log("---->"+count)
    if (count == 40){
      this.loadingController.dismiss();
      clearInterval(this.intervalId)
      this.uiService.presentAlertInfo(textos.errorNoRespondeEnPoint.timeOutError.descripcion)
      this.navController.navigateRoot("/logout");
    }
  }, 1000);
}

 // Primero guardo filtros activos, después filtro y por último cierro los FAB's

    onClickFilter(filter: string, typeFilter: string, fabCollection: any) {

        // Cierro los FAB's
        this.posicionDiaService.closeFabs(fabCollection);
        // Guardo los nuevos filtros
        this.activeFilters = this.posicionDiaService.getNewActiveFilters(filter, typeFilter,this.activeFilters);  ;
        // Filtro
        this.parcialTableData = this.posicionDiaService.filter(this.activeFilters, this.completeTableDataMostrar);
        this.filtroDestino  = this.activeFilters.destino;
        this.filtroEstado = this.activeFilters.estado;


        // Cambio el titulo por uno mas acorde
        if (this.activeFilters.destino && this.activeFilters.estado) {

            this.tituloCantidad = `Total: ${this.parcialTableData.length}`;
        } else {
            if (typeFilter === 'todos') {
                // Guardo todos en cantidad
                this.filtroDestino  ="";
                this.filtroEstado = "";
                this.tituloCantidad = `Cantidad en Posicion: ${this.completeTableDataMostrar.length}`;
            } else {
                this.tituloCantidad = `${this.posicionDiaService.getTituloFiltrado(filter, typeFilter)}${this.parcialTableData.length}`;
            }
        }

    }


    // Retorna los nuevos filtros activos
    getNewActiveFilters(filter: string, typeFilter: string, oldActiveFilters: {estado: string, destino: string}) {
      // Primeramente checkeo si está limpiando los filtros, en ese caso retorno un activeFilters vacio
      if (typeFilter === 'todos') {
        this.filtroDestino  ="";
        this.filtroEstado = "";
          return {estado: null, destino: null};
      }

      // hago una copia para evitar mutación
      let activeFilters: {estado: string, destino: string} = oldActiveFilters;
      this.filtroDestino  =activeFilters.estado;
      this.filtroEstado = activeFilters.destino;
      // Asigno el nuevo filtro. Ejemplo activeFilters['estado'] = 'Demorado';
      activeFilters["estado"] = activeFilters.estado;
      activeFilters["destino"] = activeFilters.destino;
      return activeFilters;
  }
  async doRefresh(event:any) {
    console.log("doRefresh");
    await this.refreshTable();
    event.target.complete();
  }
public getLogoEmpresa() {
    if (this.resumen.empresa.id != '') {
      this.logo = Configuraciones.rutaLogos + this.resumen.empresa.id + '.png';
      return this.logo;
    } else {
      return Configuraciones.rutaLogos + '00.png';
    }
}
  /**
   * Esta funcion se usa para cargar los datos restantes
   */
  public  cargarDatos() {

    // traigo las notificaciones
    //this.notificacionesService.load().then((notificaciones) => {
      //this.notificaciones = notificaciones;
    //});
    // traigo el mercado de cereales
   // await this.uiService.presentLoading("Cargando mercados...");



  }


// Abre o cierra la info extra de una carta de porte
toggleState(indice: string | number) {
  this.estadosToggleCarta[indice] = !this.estadosToggleCarta[indice];
}


  ngAfterViewInit() {
    //return 'ngAfterViewInit()';
    //let headerImporteCtacteResaltadoPositivo = '';
  }












  public linkMiCuenta() {
    this.navController.navigateRoot('/mi-cuenta');
  }
// Hago la búsqueda SIEMPRE en la tabla completa (tabla con TODAS las cps del user)
async searchByText(ev: any,  exclude?: any) {


  // Saco los filtros
  this.activeFilters = {estado: "", destino: ""};
  // Activo spinner mientras busca
  this.loading = false;
  // Busco
  let respuestaBusqueda = await this.responsiveTableService.searchByNroCartaOrPatente(ev, this.completeTableDataMostrar);
  // Defino si hay una búsqueda activa
  this.busquedaActiva = respuestaBusqueda.busquedaActiva;
  // Guardo la parcial table encontrada
  this.completeTableDataMostrar = respuestaBusqueda.parcialTableEncontrada;
  // Cierro todos los toggles de las cartas de porte
  this.estadosToggleCarta = this.responsiveTableService.closeToggles(this.estadosToggleCarta);
}

// Se hace el lazyLoad. Esto es, ir agregando items a medida que llega al final del scroll
doInfiniteBottom(infiniteScroll : any) {
  // Cierro todos los toggles de las cartas de porte
  this.estadosToggleCarta = this.responsiveTableService.closeToggles(this.estadosToggleCarta);
  // Obtengo la nueva parcialTableData con elemento agregados
  this.parcialTableData = this.responsiveTableService.doLazyLoad(
      this.parcialTableData,
      this.completeTableData,
      'bottom'
  );

  // Esto es para performance, reduce el tamaño de la parcialTable
   this.parcialTableData = this.posicionDiaService.reduceParcialTable(
       this.parcialTableData,
      10
   );
  // Aviso que se hizo el lazyLoad
  infiniteScroll.target.complete();

}

// Método usado principalmente para subscribirme a eventos
ionViewWillEnter() {
  // Me subscribo al evento del scroll para hacer el infinite scroll de arriba
 // this.content.ionScroll.subscribe(($event: any) => this.doInfiniteScrollTop($event));
}

doInfiniteScrollTop($event: { scrollTop: any; }) {
  // Hago la lógica del infinite scroll de arriba y obtengo la data a cambiar
  const dataInfScrollTop = this.responsiveTableService.doInfiniteScrollTop(
      $event,
      this.lastScrollTop,
      this.completeTableData,

      this.parcialTableData,
      this.busquedaActiva,
      this.estadosToggleCarta,
      this.activeFilters
  );

  // Si obtuve data a cambiar, la cambio
  if (dataInfScrollTop) {
      this.zone.run(() => {
          this.estadosToggleCarta = dataInfScrollTop.newEstadosToggleCarta;
          this.parcialTableData = dataInfScrollTop.newParcialTableData;
          const [x, y, delay] = dataInfScrollTop.toScrollCord;
          this.content.scrollToPoint(x, y, delay);
      });
  }

  // Necesario para asegurarse que el user no se desplaza hacia abajo
  this.lastScrollTop = $event.scrollTop;
}
// Refresca la tabla
async refreshTable() {
 // alert("refresh table")
  try {
      // Buscqueda activa false
      this.busquedaActiva = false;
      // Guardo la lista de estados para filtrar (varia si es puertos o cerealnet)
      this.estadosList = this.posicionDiaService.formatEstadosCartaPosicion(
          this.puertosService.getIfPuertos() ?
              estadosCartaPosicionPuertos : estadosCartaPosicion
      );
      // Declaro filtros vacios
      this.activeFilters = {estado : "", destino: ""};
      // Busco y guardo el usuario activo
      if (typeof this.usuarioActivoJson === 'string') {
        this.usuarioActivo =  JSON.parse(this.usuarioActivoJson);

      }
      // Obtengo posición del día


      this.posicionDiaService.getPosicionDia().then(
        async resp => {

          const respuesta = JSON.stringify(resp);

          this.esPuertosSn = this.puertosService.getIfPuertos();
          const data = JSON.stringify(resp);
          this.completeTableData = JSON.parse(data).data ;

          // Guardo la cantidad en posicion (Posicion del dia)


         // Guardo una parte parcial de la tabla completa (lazy load)


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
         this.parcialTableData = this.responsiveTableService.getInitParcialTable(this.completeTableDataMostrar);
         if (!this.completeTableData){
          this.tituloCantidad = `Nada en Posición `;
        }else{
          this.tituloCantidad = `Cantidad en Posicion: `+this.completeTableDataMostrar.length;
        }
        clearInterval(this.intervalId)
          // Obtengo los destinos para los filtros
          this.destinosList = this.posicionDiaService.getDestinosList(this.completeTableData);
          // Inicializo los estados toggle de las cartas en false
          this.estadosToggleCarta = this.responsiveTableService.initToggles(this.completeTableData.length);
           // Texto buscado vacio
          this.inputSearchBar = '';
          await this.loadingController.dismiss();
        }) ;





      // fin posicion dia

  }
  catch(err) {
      console.log(err);
      // Muestro error
      /*this.textos.erroresGenericos.timeOutError.titulo +
        this.textos.erroresGenericos.timeOutError.descripcion*/
        clearInterval(this.intervalId)
      this.uiService.presentAlertInfo(textos.erroresGenericos.timeOutError.titulo+": "+textos.erroresGenericos.timeOutError.descripcion);

  }
}




}


