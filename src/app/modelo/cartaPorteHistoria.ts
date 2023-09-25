import { EstadoCarta } from "./estadoCarta";
import { Destino } from "./destino";
import { Interviniente } from "./interviniente";
import { Entregador } from "./entregador";
import { Cereal } from "./cereal";
import { Localidad } from "./localidad";
import { Planta } from "./planta";
import { Calidad } from "./calidad";
import { Analisis } from "./analisis";

export class CartaPorteHistoria {
    nroCarta: number;
    nroVagon: number;
    fechaDescarga: Date;
    patente: string;
    nroContrato: string;
    kgBruto: number;
    kgTara: number;
    kgNeto: number;
    observacion: string;
    destino: Destino | undefined;
    intervinientes: Interviniente [];

    entregador: Entregador;
    nroCtg: string;
    cereal: Cereal;
    fechaCarga: Date;
    fechaVencimiento: Date;
    tipoGrano: string;
    cosecha: string;
    brutoProcedencia: number;
    taraProcedencia: number;
    netoProcedencia: number;
    plantaProcedencia: Planta;
    plantaDestino: Planta;
    patenteAcoplado: string;
    kmRecorrer: number;
    tarifaPorTonelada: number;
    fechaArribo: Date;
    horaArribo: string;
    horaDescarga: string;
    calidad: Calidad;
    analisis: Analisis;
    renspa: string;

    constructor (cartaPorte: {
        nroCarta: number,
        nroVagon: number,
        fechaDescarga: Date,
        patente: string,
        nroContrato: string,
        kgBruto: number,
        kgTara: number,
        kgNeto: number,
        observacion: string,
        destino: {
            nroCarta: number;
            cuit: number;
            descripcion: string;
            descripcionAbre: string;
        },
        intervinientes: [
            {
                nombre: string,
                nroCuit: string,
                tipoInterviniente: {
                    idTipoInterviniente: number,
                    nombre: string
                }
            }
        ],
        entregador:  {
            idEntregador: number,
            nombre: string,
            cuit: string,
            nombreCorto: string
        },
        nroCtg: string,
        cereal: {
            idCereal: number;
            nombre: string;
        },
        fechaCarga: Date,
        fechaVencimiento: Date,
        tipoGrano: string,
        cosecha: string,
        brutoProcedencia: number,
        taraProcedencia: number,
        netoProcedencia: number,
        plantaProcedencia: {
            idPlanta: number;
            descripcion: string;
            direccion: string;
            localidad: {
                ncLocalidad: number;
                descripcion: string;
                partido: {
                    ncPartido: number;
                    descripcion: string;
                    provincia: {
                        ncProvincia: number;
                        descripcion: string;
                    }
                }
            }
        },
        plantaDestino: {
            idPlanta: number;
            descripcion: string;
            direccion: string;
            localidad: {
                ncLocalidad: number;
                descripcion: string;
                partido: {
                    ncPartido: number;
                    descripcion: string;
                    provincia: {
                        ncProvincia: number;
                        descripcion: string;
                    }
                }
            }
        },
        patenteAcoplado: string,
        kmRecorrer: number,
        tarifaPorTonelada: number,
        fechaArribo: Date,
        horaArribo: string,
        horaDescarga: string,
        calidad: {
            idCalidad: number;
            descripcion: string;
            descripcionCorta: string;
        },
        analisis: {
            porcentaje: number;
            kgsMerma: number;
            porcentajeMerma: number;
            cantidad: number;
            rubro: {
                idRubro: number;
                descripcion: string;
                descripcionCorta: string;
            }
        },
        renspa: string;
    }) {
        this.nroCarta = cartaPorte.nroCarta;
        this.nroVagon = cartaPorte.nroVagon;
        this.fechaDescarga = cartaPorte.fechaDescarga;
        this.patente = cartaPorte.patente;
        this.nroContrato = cartaPorte.nroContrato;
        this.kgBruto = cartaPorte.kgBruto;
        this.kgTara = cartaPorte.kgTara;
        this.kgNeto = cartaPorte.kgNeto;
        this.observacion = cartaPorte.observacion;
        // Si el destino existe
        if (cartaPorte.destino) {
            this.destino = new Destino(cartaPorte.destino);
        }
        // Reformateo los intervinientes
        this.intervinientes = cartaPorte.intervinientes.map(interviniente =>{
            return new Interviniente(interviniente);
        });

        this.entregador = new Entregador(cartaPorte.entregador);
        this.nroCtg = cartaPorte.nroCtg;
        this.cereal = new Cereal(cartaPorte.cereal);
        this.fechaCarga = cartaPorte.fechaCarga;
        this.fechaVencimiento = cartaPorte.fechaVencimiento;
        this.tipoGrano = cartaPorte.tipoGrano;
        this.cosecha = cartaPorte.cosecha;
        this.brutoProcedencia = cartaPorte.brutoProcedencia;
        this.taraProcedencia = cartaPorte.taraProcedencia;
        this.netoProcedencia = cartaPorte.netoProcedencia;
        this.plantaProcedencia = new Planta(cartaPorte.plantaProcedencia);
        this.plantaDestino = new Planta(cartaPorte.plantaDestino);
        this.patenteAcoplado = cartaPorte.patenteAcoplado;
        this.kmRecorrer = cartaPorte.kmRecorrer;
        this.tarifaPorTonelada = cartaPorte.tarifaPorTonelada;
        this.fechaArribo = cartaPorte.fechaArribo;
        this.horaArribo = cartaPorte.horaArribo;
        this.horaDescarga = cartaPorte.horaDescarga;

        this.calidad = new Calidad(cartaPorte.calidad);

        this.analisis = new Analisis(cartaPorte.analisis);
        this.renspa = cartaPorte.renspa;
    }

    // Retorno el interviniente por su tipo. Ejemplo: "TITULAR"
    getIntervinienteByTipo(tipo: string) {
        let intervinienteBuscado: Interviniente;

        this.intervinientes.forEach(inter => {
            if (inter.tipoInterviniente.nombre === tipo) {
                intervinienteBuscado = inter;
            }
            return intervinienteBuscado;
        });


    }


}

