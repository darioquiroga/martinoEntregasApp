export class Provincia {
    ncProvincia: number;
    descripcion: string;

    constructor(provincia: any) {
        this.ncProvincia = provincia.ncProvincia;
        this.descripcion = provincia.descripcion;
    }
}
