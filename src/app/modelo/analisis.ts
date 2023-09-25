import { RubroAnalisis } from "./rubroAnalisis";

export class Analisis {
    porcentaje: number | undefined;
    kgsMerma: number | undefined;
    porcentajeMerma: number | undefined;
    cantidad: number | undefined;
    rubro: RubroAnalisis | undefined;

    constructor(analisis: {
        porcentaje: number;
        kgsMerma: number;
        porcentajeMerma: number;
        cantidad: number;
        rubro: {
            idRubro: number;
            descripcion: string;
            descripcionCorta: string;
        }
    }) {
        // Me fijo si trae analisis la cp, algunas no tienen y rompe
        if (analisis) {
            this.porcentaje = analisis.porcentaje;
            this.kgsMerma = analisis.kgsMerma;
            this.porcentajeMerma = analisis.porcentajeMerma
            this.cantidad = analisis.cantidad;
            this.rubro = new RubroAnalisis(analisis.rubro);
        } else {
           // this.rubro = null;
        }
    }
}
