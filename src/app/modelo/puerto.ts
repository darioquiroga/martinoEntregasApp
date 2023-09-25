export class Puerto {
    ptoCodinterno: number;
    ptoCuit: number;
    ptoPostalonnca: number;
    ptoRazon: string;
    ptoDomicilio: string;
    ptoTurno: string;
    ptoLocalOncca: number;
    ptoControlTurno: string;
    ptoPlanta: number;
    ptoSeleccion: number;
    ptoTipo: number
/*?: {
        ptoCodinterno: number;
        ptoCuit: number;
        ptoPostalonnca: number;
        ptoRazon: string;
        ptoDomicilio: string;
        ptoTurno: string;
        ptoLocalOncca: number;
        ptoControlTurno: string;
        ptoPlanta: number;
        ptoSeleccion: number;
        ptoTipo: number*/
    constructor(puerto:any) {
        if (puerto) {
            this.ptoCodinterno = puerto.ptoCodinterno;
            this.ptoCuit = puerto.ptoCuit;
            this.ptoPostalonnca = puerto.ptoPostalonnca;
            this.ptoRazon = puerto.ptoRazon;
            this.ptoDomicilio = puerto.ptoDomicilio;
            this.ptoTurno = puerto.ptoTurno;
            this.ptoLocalOncca = puerto.ptoLocalOncca;
            this.ptoControlTurno = puerto.ptoControlTurno;
            this.ptoPlanta = puerto.ptoPlanta;
            this.ptoSeleccion = puerto.ptoSeleccion;
            this.ptoTipo = puerto.ptoTipo
        } else {
            this.ptoCodinterno = 0;
            this.ptoCuit = 0;
            this.ptoPostalonnca = 0;
            this.ptoRazon = '';
            this.ptoDomicilio = '';
            this.ptoTurno = '';
            this.ptoLocalOncca = 0;
            this.ptoControlTurno = '';
            this.ptoPlanta = 0;
            this.ptoSeleccion = 0;
            this.ptoTipo = 0;
        }
    }

}
