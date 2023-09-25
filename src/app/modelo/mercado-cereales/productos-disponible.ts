export class ProductosDisponible {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public id : number;
    public indice: number;
    public producto: number;
    public nombre: string;
    public precioTn: number;
    public idPuerto: number;
    public monedaSimbolo: string;
    public monedaNombre: string;
    public orden: number;
    public variacionDiaAnterior: number;
    public condicion: number;
    public cierre: string;
    public observaciones: string;
    public fecha: string;
    public hora: string;
    public nombrePuerto:String;
  
    constructor(productos : any){
      let [ producto ] = productos;
      this.id = producto.id;
      this.indice = producto.indice;
      this.producto = producto.producto;
      this.nombre = producto.nombre;
      this.precioTn = producto.precioTn;
      this.idPuerto =  producto.idPuerto;
      this.monedaSimbolo = producto.monedaSimbolo;
      this.monedaNombre = producto.monedaNombre;
      this.orden = producto.orden;
      this.variacionDiaAnterior = producto.variacionDiaAnterior;
      this.condicion = producto.condicion;
      this.cierre = producto.cierre;
      this.observaciones = producto.observaciones;
      this.fecha = producto.fecha;
      this.hora = producto.hora;
      this.nombrePuerto = producto.nombrePuerto;
    }
  }