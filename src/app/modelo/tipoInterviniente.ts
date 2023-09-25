export class TipoInterviniente {
    idTipoInterviniente: number;
    nombre: string;

    constructor(
        tipoInterviniente: {
            idTipoInterviniente: number,
            nombre: string
        }
    ) {
        this.idTipoInterviniente = tipoInterviniente.idTipoInterviniente
        this.nombre = tipoInterviniente.nombre
    }
}
