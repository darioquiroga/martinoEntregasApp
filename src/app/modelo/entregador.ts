export class Entregador {
    idEntregador: number;
    nombre: string;
    cuit: string;
    nombreCorto: string;

    constructor(entregador: {
        idEntregador: number;
        nombre: string;
        cuit: string;
        nombreCorto: string;
    }){
        this.idEntregador = entregador.idEntregador;
        this.nombre = entregador.nombre;
        this.cuit = entregador.cuit;
        this.nombreCorto = entregador.nombreCorto;
    }
}
