import { Provincia } from "./provincia";

export class Partido {
    ncPartido: number;
    descripcion: string;
    provincia: Provincia = new Provincia({});

    constructor(partido : any) {
      this.ncPartido = partido.ncPartido;
      this.descripcion = partido.descripcion;
      //this.provincia = new Provincia(partido.provincia);
      }
}
