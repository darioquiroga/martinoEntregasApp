import { ProductosDisponible } from './productos-disponible';

export class MercadoDisponible {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public code : number;
  public status: string;
  public detail: string;
  public author: string;
  public data: ProductosDisponible[];
  //---------------------------------------------//
  constructor(mercadoCereales : any){
    this.code = mercadoCereales.code ;
    this.status = mercadoCereales.status;
    this.author = mercadoCereales.Author;
    this.detail = mercadoCereales.detail;
    // Inicio el arreglo
    this.data = [];
    // Lo relleno
    mercadoCereales.data.forEach((variable: ProductosDisponible) => {
        this.data.push(variable);
    });   
  }
}