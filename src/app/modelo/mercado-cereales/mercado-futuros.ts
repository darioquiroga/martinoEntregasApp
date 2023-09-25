import { ProductosFuturos } from './productos-futuros';

export class MercadoFuturos {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public code : number;
  public status: string;
  public detail: string;
  public author: string;
  public data: ProductosFuturos[];
  //---------------------------------------------//
  constructor(mercadoCereales : any){
    this.code = mercadoCereales.code ;
    this.status = mercadoCereales.status;
    this.author = mercadoCereales.Author;
    this.detail = mercadoCereales.detail;
    // Inicio el arreglo
    this.data = [];
    // Lo relleno
    mercadoCereales.data.forEach((variable: ProductosFuturos) => {
        this.data.push(variable);
    });   
  }
}