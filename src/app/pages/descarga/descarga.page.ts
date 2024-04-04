import { async } from '@angular/core/testing';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NavController, IonContent } from '@ionic/angular';
// Constantes
import { estadosCartaPosicion } from '../../shared/constants/estadosCartaPorte';
import { Configuraciones } from '../../shared/constants/configuraciones';

// Services
import { UiService } from 'src/app/services/ui.service';
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { Usuario } from 'src/app/modelo/usuario';
import { Perfil } from 'src/app/modelo/perfil';
import { Tipo } from 'src/app/modelo/tipo';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { state, style, transition, trigger } from '@angular/animations';
import { textos } from 'src/app/shared/textos/textos';
import { CartaPorteHistoria } from 'src/app/modelo/cartaPorteHistoria';
import { DescargaService } from 'src/app/services/descarga.service';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { PosicionDiaService } from 'src/app/services/posicion-dia.service';

@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.page.html',
  styleUrls: ['./descarga.page.scss'],
  animations: [
    trigger('extraInfoState', [
        state('false',
            style(({
                transform: 'scaleY(0)',
                //overflow: 'hidden',
                display: 'none'
            }))
        ),
        state('true',
            style({
                transform: 'scaleY(1)',
                display: 'block'
            })
        ),

    ])
]
})
export class DescargaPage implements OnInit {
 // Content para scrollear al bottom
 //@ViewChild(IonContent) ionContent: IonContent;
 // Spinner
 loading: boolean = false;
 // Estado de la busqeuda, si esta activa o no
 busquedaActiva: boolean = false;
 // nada en posicion
 nadaEnPosicion:String |undefined;
 // nada en busqueda
 nadaEnBusqueda: String | undefined;

 // Texto buscado (esta bindeado con el input)
 inputSearchBar: string | undefined;
 // Estados de cartas expandidas o contraidas
 estadosToggleCarta: boolean[] = [];
 // Tabla de cartas mutada (filtrada, achicada, etc)
 parcialTableData: CartaPortePosicion[] = [];
 // Tabla de cartas inicial completa
  completeTableData :  CartaPortePosicion[] = [];
 // Cantidad de camiones en posición
 tituloCantidad: string | undefined;
 // Guardo el usuario activo en una variable
 usuarioActivo: Usuario | any;
 // Necesario para asegurarse que el user no se desplaza hacia abajo (infiniteScrollTop)
 lastScrollTop : any | undefined;
 filtroVisible: any | "N";
 // Fecha para filtrar la descarga
// Lista con todos los destinos de las cartas
destinosList: string[] = [];

 filtroFecha: Date | undefined;
totalCartas: any | 0;
activeFilters: { /*estado: string; */destino: string; } | any;
filtroDestino: String | undefined;
 // respuesta del servicio de estado ok, ver luego si esto se quita
 respuestaEstadoDescarga : string |  undefined;
 istodoCargado : any
 public intervalId : any
 // Spinner imagen descarga
  descargandoImagen: any;
  datePicker: any;
  @Input() cartaDePorte: CartaPorteHistoria | any;
  constructor(
    public responsiveTableService: ResponsiveTableService,
    private loadingController: LoadingController,
    private navController: NavController,
    private zone: NgZone,
    //private datePicker: DatePicker,
   // public puertosService: PuertosService,
    public descargaService: DescargaService,
    public posicionDiaService: PosicionDiaService,
    private uiService: UiService,
  ) { }
/*  if (!this.cartaDePorte : any) {
    this.cartaDePorte = navParams.data.cartaDePorte;
}*/
  usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  async searchByText(ev: any, exclude?:any) {
    // Activo spinner mientras busca

    this.loading = false;
    // Busco
    let respuestaBusqueda = await this.responsiveTableService.searchByNroCartaOrPatente(ev, this.completeTableData);

    // Defino si hay una búsqueda activa
    this.busquedaActiva = respuestaBusqueda.busquedaActiva;
    // Guardo la parcial table encontrada
    this.parcialTableData = respuestaBusqueda.parcialTableEncontrada;
    // Cierro todos los toggles de las cartas de porte
    this.estadosToggleCarta = this.responsiveTableService.closeToggles(this.estadosToggleCarta);

  }
  // Abre o cierra la info extra de una carta de porte
  toggleState(indice: any) {
    this.estadosToggleCarta[indice] = !this.estadosToggleCarta[indice];
  }
   // Inicializa la tabla
   async initTable() {

  // Pongo el spinner
    this.loading = true;
    await this.uiService.presentLoading("Cargando...");

    // Seteo un titulo por default
    this.tituloCantidad = `Descarga de ayer`
    // Seteo la fecha por default en ayer
    this.filtroFecha = new Date((new Date).getTime() - 24*60*60*1000);
    // Busco la posicion y refresco

     await this.refreshTable();

}

controlCarga(){

  let count = 0;
  this.intervalId = setInterval(()=>{
    count++;
    console.log("---->"+count)
    if (count == 20){

      clearInterval(this.intervalId)
      this.loadingController.dismiss();

      this.uiService.presentAlertInfo(textos.errorNoRespondeEnPoint.timeOutError.descripcion)
      this.navController.navigateRoot("/logout");
    }
  }, 1000);
}

 /**
     * Refresca la tabla
     */
 async doRefresh(event:any) {
  console.log("doRefresh");
  await this.refreshTable();
  event.target.complete();
}

/**
     * Cambia la fecha de busqueda (SOLO FUNCIONA EN CELULAR, NO EN WEB)
     */
changeDate() {

 this.refreshTable();

}

// Primero guardo filtros activos, después filtro y por último cierro los FAB's

onClickFilter(filter: string, typeFilter: string, fabCollection: any) {

  // Cierro los FAB's
  this.posicionDiaService.closeFabs(fabCollection);
  // Guardo los nuevos filtros
  this.activeFilters = this.posicionDiaService.getNewActiveFilters(filter, typeFilter,this.activeFilters);  ;
  // Filtro
  this.parcialTableData = this.posicionDiaService.filter(this.activeFilters, this.completeTableData);



 this.filtroDestino  = this.activeFilters.destino;
  // Cambio el titulo por uno mas acorde
  if (this.activeFilters.destino && this.activeFilters.estado) {

      this.tituloCantidad = `Total: ${this.parcialTableData.length}`;
  } else {
      if (typeFilter === 'todos') {
          // Guardo todos en cantidad
          this.filtroDestino  ="";

          this.tituloCantidad = `Cantidad en Posicion: ${this.parcialTableData.length}`;
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

    return {estado: null, destino: null};
}

// hago una copia para evitar mutación
let activeFilters: {estado: string, destino: string} = oldActiveFilters;
this.filtroDestino  =activeFilters.estado;

// Asigno el nuevo filtro. Ejemplo activeFilters['estado'] = 'Demorado';
activeFilters["estado"] = activeFilters.estado;
activeFilters["destino"] = activeFilters.destino;
return activeFilters;
}





/**
     * Refresca la tabla
     */
// Refresca la tabla
async refreshTable() {

   try {
       // Pongo el spinner para descarga imagen en false
       this.descargandoImagen = false;
       // Pongo el spinner
       this.loading = true;
       // Pongo la tabla en 0 para que se vea el spinner
       this.parcialTableData = [];
       // Buscqueda activa false
       this.busquedaActiva = false;
       // Busco y guardo el usuario activo
       if (typeof this.usuarioActivoJson === 'string') {
         this.usuarioActivo =  JSON.parse(this.usuarioActivoJson);
       }

       // Obtengo posición del día

    const formattedDate = new DatePipe('en-US').transform(this.filtroFecha, 'yyyyMMdd');


      this.descargaService.getDescarga(formattedDate, formattedDate).then(
        async (resp: any)=>{
          this.loading = false;
          this.loadingController.dismiss();
          clearInterval(this.intervalId)
          if (resp.data.length == 0){

            this.tituloCantidad = `Descarga de ayer`;
            this.uiService.presentAlertInfo("No se encontraron datos de descarga");
            this.filtroVisible = "N"
          }else{
            let response = JSON.parse(JSON.stringify(resp.data));
            this.filtroVisible = "S";
            this.completeTableData = response

            // Guardo la cantidad en posicion (Posicion del dia)
            //let cantidadReg = this.completeTableData.length

            this.tituloCantidad = `Descarga de ayer (`+resp.data.length+")";
            this.respuestaEstadoDescarga =  response.descripcion;


            // Guardo una parte parcial de la tabla completa (lazy load)
            this.parcialTableData = this.completeTableData;//this.responsiveTableService.getInitParcialTable(this.completeTableData);
            this.totalCartas = this.parcialTableData.length;
            // Inicializo los estados toggle de las cartas en false
            this.estadosToggleCarta = this.responsiveTableService.initToggles(this.completeTableData.length);9

            // Obtengo los destinos para los filtros
            this.destinosList = this.posicionDiaService.getDestinosList(this.completeTableData);
            clearInterval(this.intervalId)
            // Texto buscado vacio
            this.inputSearchBar = '';
            // Saco el spinner
            this.loading = false;
            this.loadingController.dismiss();


        }

        },
        (error: any) => {
          clearInterval(this.intervalId)
         this.uiService.presentAlertInfo("Error: "+error);


        })
      }catch(error){
        this.uiService.presentAlertInfo("Error: "+error);
        await this.loadingController.dismiss();

      };

    }





  ngOnInit() {

    this.nadaEnBusqueda =  textos.posicionDia.html.nadaEnPosicion;
    this.nadaEnPosicion = textos.posicionDia.html.nadaEnBusqueda
    this.controlCarga()
      this.initTable();
    }

}
