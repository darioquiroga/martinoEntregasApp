export class Calidad {
    idCalidad!: number;
    descripcion!: string ;
    descripcionCorta!: string;

    constructor(calidad: {
        idCalidad: number;
        descripcion: string;
        descripcionCorta: string;
    }){
        if (calidad) {
            this.idCalidad = calidad.idCalidad;
            this.descripcion = calidad.descripcion;
            this.descripcionCorta = calidad.descripcionCorta;
        }
    }
}
