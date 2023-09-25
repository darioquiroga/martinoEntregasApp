export class Permiso {
    id: number;
    descripcion: string;
    url: string;

    constructor(permiso: {
        id: number;
        descripcion: string;
        url: string;
    }) {
        this.id = permiso.id;
        this.descripcion = permiso.descripcion;
        this.url = permiso.url;
    }

}
