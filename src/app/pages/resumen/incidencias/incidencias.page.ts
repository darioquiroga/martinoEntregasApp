import { AppComponent } from './../../../app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Component, OnInit,  NgZone,  ViewChild, inject } from '@angular/core';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import {  IonContent, IonFab, IonRefresher, RefresherCustomEvent, RefresherEventDetail  } from '@ionic/angular';
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
import { Mensajes } from 'src/app/modelo/mensajes';



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
import { environment } from 'src/environments/environment';



//import { posicionDiaAnimations } from './posicionDiaAnimations';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],

})
export class IncidenciasPage implements OnInit {

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
  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  public tokenWAPPI : any = localStorage.getItem('tokenWappi')?.toString();
  mensajes: Mensajes[] = JSON.parse(localStorage.getItem('mensajes') || '[]');
  public mensajeEnviadoSn : string | undefined;
  public cantidadRegistros :any;
  public intervalId: any;
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
   // Tabla estados
   completeTableDataMostrarIncidencias :  CartaPortePosicion[] = [];
   completeTableDataRechazados:  CartaPortePosicion[] = [];
   completeTableDataDemorados:  CartaPortePosicion[] = [];
   completeTableDataDesviados:  CartaPortePosicion[] = [];



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
    private mensajeriaService: MensajeriaService,
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
  this.tituloCantidad = `Incidencias`;
  // Busco la posicion y refresco

  await this.refreshTable();
  // Saco el spinner
   this.loading = false




}
 // Primero guardo filtros activos, después filtro y por último cierro los FAB's

    onClickFilter(filter: string, typeFilter: string, fabCollection: any) {

        // Cierro los FAB's
        this.posicionDiaService.closeFabs(fabCollection);
        // Guardo los nuevos filtros
        this.activeFilters = this.posicionDiaService.getNewActiveFilters(filter, typeFilter,this.activeFilters);  ;
        // Filtro
        this.parcialTableData = this.posicionDiaService.filter(this.activeFilters, this.completeTableDataMostrarIncidencias);

        this.filtroDestino  = this.activeFilters.destino;
        this.filtroEstado = this.activeFilters.estado;


        // Cambio el titulo por uno mas acorde
        this.tituloCantidad = `Incidencias: ${this.parcialTableData.length}`;

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

      // Asigno el nuevo filtro. Ejemplo activeFilters['estado'] = 'Demorado';

      activeFilters["destino"] = activeFilters.destino;
      return activeFilters;
  }
/*async doRefresh(event) {

  // Recargo toda la tabla
  await this.refreshTable();
  // Aviso que finalizó
  refresher.complete();
  // Saco el spinner
  this.loading = false
}*/

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
  controlCarga(){

    let count = 0;
    this.intervalId = setInterval(()=>{
      count++;
    //  console.log("---->"+count)
      if (count == 20){
        this.loadingController.dismiss();
        clearInterval(this.intervalId)

        this.uiService.presentAlertInfo(textos.errorNoRespondeEnPoint.timeOutError.descripcion)
        this.navController.navigateRoot("/logout");
      }
    }, 1000);
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
  let respuestaBusqueda = await this.responsiveTableService.searchByNroCartaOrPatente(ev, this.completeTableDataMostrarIncidencias);
  // Defino si hay una búsqueda activa
  this.busquedaActiva = respuestaBusqueda.busquedaActiva;
  // Guardo la parcial table encontrada
  this.completeTableDataMostrarIncidencias = respuestaBusqueda.parcialTableEncontrada;
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
   // Buscqueda activa false


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
          this.loading = false
          const respuesta = JSON.stringify(resp);
          this.esPuertosSn = this.puertosService.getIfPuertos();
          const data = JSON.stringify(resp);
          this.completeTableData = JSON.parse(data).data ;


          // Guardo la cantidad en posicion (Posicion del dia)


         // Guardo una parte parcial de la tabla completa (lazy load)


         this.completeTableDataDemorados = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Demorado");
         this.completeTableDataDesviados = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Desviado");
         this.completeTableDataRechazados = this.responsiveTableService.getInitFilterByEstado(this.completeTableData, "Rechazo");

         this.completeTableDataMostrarIncidencias = this.completeTableDataRechazados.concat(this.completeTableDataDemorados)
         this.cantidadRegistros =  this.completeTableDataMostrarIncidencias.length;
         this.parcialTableData = this.responsiveTableService.getInitParcialTable(this.completeTableDataMostrarIncidencias);
         if (!this.completeTableDataMostrarIncidencias){
          this.tituloCantidad = `Nada en Posición `;
        }else{
          this.tituloCantidad = `Incidencias: `+this.completeTableDataMostrarIncidencias.length;
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
      clearInterval(this.intervalId)
      // Muestro error
      /*this.textos.erroresGenericos.timeOutError.titulo +
        this.textos.erroresGenericos.timeOutError.descripcion*/
      this.uiService.presentAlertInfo(textos.erroresGenericos.timeOutError.titulo+": "+textos.erroresGenericos.timeOutError.descripcion);

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


