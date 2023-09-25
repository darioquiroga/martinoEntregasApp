export class Tipo {
    id: number;
    descripcion: string;

    constructor(tipo: {
        id: number;
        descripcion: string;
    }) {
        this.id = tipo.id;
        this.descripcion = tipo.descripcion;
    }
}