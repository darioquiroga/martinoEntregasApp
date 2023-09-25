export class EstadoCarta {
    idEstadoCarta: number;
    descripcion: string;

    constructor(estadoCarta: {
        idEstadoCarta: number;
        descripcion: string;
    }) {

        this.idEstadoCarta = estadoCarta.idEstadoCarta;
        this.descripcion = estadoCarta.descripcion;
    }
}
