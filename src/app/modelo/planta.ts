import { Localidad } from "./localidad";

export class Planta {
    idPlanta!: number;
    descripcion!: string;
    direccion!: string;
    localidad!: Localidad;


    constructor(planta: {
        idPlanta: number;
        descripcion: string;
        direccion: string;
        localidad: {
            ncLocalidad: number;
            descripcion: string;
            partido: {
                ncPartido: number;
                descripcion: string;
                provincia: {
                    ncProvincia: number;
                    descripcion: string;
                }
            }
        }
    }) {
        if (planta) {
            this.idPlanta = planta.idPlanta;
            this.descripcion = planta.descripcion;
            if (planta.direccion) {
                this.direccion = planta.direccion;
            }
            if (planta.localidad) {
                this.localidad = new Localidad(planta.localidad);
            }
        }
    }
}
