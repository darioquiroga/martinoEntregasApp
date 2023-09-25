/*export class Destino {
    nroCarta!: number | undefined;
    cuit!: number | undefined;
    descripcion : string | undefined;
    descripcionAbre: string | undefined;

    constructor(destino?: {
        nroCarta: number;
        cuit: number;
        descripcion: string;
        descripcionAbre: string;
    }) {
        if (destino) {
            this.nroCarta = destino.nroCarta;
            this.cuit = destino.cuit;
            this.descripcion = destino.descripcion;
            this.descripcionAbre = destino.descripcionAbre;
        }
    }
}
*/
export class Destino {
  public nroCarta : number;
  public cuit : number ;
  public descripcion : string ;
  public descripcionAbre : string ;

  constructor(destino: any) {
      if (destino) {
        this.nroCarta = destino.nroCarta;
        this.cuit = destino.cuit;
        this.descripcion = destino.descripcion;
        this.descripcionAbre = destino.descripcionAbre;
      }else{
        this.nroCarta = 0;
        this.cuit = 0;
        this.descripcion = '';
        this.descripcionAbre  = ''
      }
  }
}
