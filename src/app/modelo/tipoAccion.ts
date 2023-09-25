export class TipoAccion {
    tipo: number;
    descripcion: string;

    constructor(tipoAccion?: {
        tipo: number;
        descripcion: string;
    }) {
        if (tipoAccion) {
            this.tipo = tipoAccion.tipo;
            this.descripcion = tipoAccion.descripcion
        } else {
            this.tipo = 0;
            this.descripcion = ''
        }
    }

}
