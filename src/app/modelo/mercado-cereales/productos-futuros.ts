export class ProductosFuturos {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public id : number;
    public indice: number;
    public idProducto: number;
    public nombre: string;
    public precioTn: number;
    public monedaSimbolo: string;
    public monedaNombre: string;
    public variacionDiaAnterior: number;
    public condicion: number;
    public cierre: string;
    public observaciones: string;
    public fecha: string;
    public hora: string;
    public periodo: string;
  
    constructor(productos : any){
      let [ producto ] = productos;
      this.id = producto.id;
      this.indice = producto.indice;
      this.idProducto = producto.idProducto;
      this.nombre = producto.nombre;
      this.precioTn = producto.precioTn;
      this.monedaSimbolo = producto.monedaSimbolo;
      this.monedaNombre = producto.monedaNombre;
      this.periodo = producto.periodo;
      this.variacionDiaAnterior = producto.variacionDiaAnterior;
      this.condicion = producto.condicion;
      this.cierre = producto.cierre;
      this.observaciones = producto.observaciones;
      this.fecha = producto.fecha;
      this.hora = producto.hora;
    }
  }