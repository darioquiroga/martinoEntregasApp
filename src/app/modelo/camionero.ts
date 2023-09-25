export class Camionero {
    nombre: string;
    celular: string;
    cuitEmpTrans: string;
    deviceId: string;

    constructor (camionero: {
        nombre: string,
        celular: string,
        cuitEmpTrans: string,
        deviceId: string
    }) {
        this.nombre = camionero.nombre;
        this.celular = camionero.celular;
        this.cuitEmpTrans = camionero.cuitEmpTrans;
        this.deviceId = camionero.deviceId;
    }
}
