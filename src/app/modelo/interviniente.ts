import { TipoInterviniente } from "./tipoInterviniente";

export class Interviniente {
    nombre: String;
    nroCuit: string;
    tipoInterviniente: TipoInterviniente;

    constructor(interviniente: {
        nombre: string,
        nroCuit: string,
        tipoInterviniente: {
            idTipoInterviniente: number,
            nombre: string
        }
    }) {
        this.nombre = interviniente.nombre
        this.nroCuit = interviniente.nroCuit
        this.tipoInterviniente = new TipoInterviniente(
            interviniente.tipoInterviniente
        );
    }
}
