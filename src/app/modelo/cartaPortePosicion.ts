import { EstadoCarta } from "./estadoCarta";
import { Destino } from "./destino";
import { Interviniente } from "./interviniente";
import { Entregador } from "./entregador";
import { Cereal } from "./cereal";
import { Localidad } from "./localidad";
import { Calidad } from "./calidad";
import { Planta } from "./planta";
import { TipoInterviniente } from "./tipoInterviniente";

export class CartaPortePosicion {
    map(arg0: (cp: any) => CartaPortePosicion): any {
      throw new Error('Method not implemented.');
    }
    nroCarta: number;
    nroVagon: number;
    fechaDescarga: Date;
    patente: string;
    nroContrato!: string;
    kgNeto: number;
    observacion: string;
    estadoCarta: EstadoCarta;
    destino!: Destino;
    codEntre: number;
    kgNetoProcedencia: number;
    intervinientes: Interviniente [];

    entregador: Entregador;

    cereal: Cereal;
    localidadProcedencia: Localidad;
    turno: number;
    calidad: Calidad;
    plantaDestino: Planta;

    plantaProcedencia!: Planta;

    estadoPosiReal!: string;
    porteEstado!: number;

    portePrefijo!: number;
    porteCodPuerto!: number;
    puertoDestino: any;
    especie: any;
    entreCp!: string;
    porteTipo!: number;

    analisis!: any[];

    constructor (cartaPorte: any,  puertos = false) {

        // debugger;
        if (!puertos) {
            this.nroCarta = cartaPorte.nroCarta;
            this.nroVagon = cartaPorte.nroVagon;
            this.fechaDescarga = cartaPorte.fechaDescarga;
            this.patente = cartaPorte.patente;
            this.nroContrato = cartaPorte.nroContrato;
            this.kgNeto = cartaPorte.kgNeto;
            this.observacion = cartaPorte.observacion;
            this.estadoCarta = new EstadoCarta(cartaPorte.estadoCarta);
            if (cartaPorte.destino) {
                this.destino = new Destino(cartaPorte.destino);
            }
            this.codEntre = cartaPorte.codEntre;
            this.kgNetoProcedencia = cartaPorte.kgNetoProcedencia;
            this.intervinientes = cartaPorte.intervinientes.map((interviniente: { nombre: string; nroCuit: string; tipoInterviniente: { idTipoInterviniente: number; nombre: string; }; }) =>{
                return new Interviniente(interviniente);
            });
            this.entregador = new Entregador(cartaPorte.entregador);
            this.cereal = new Cereal(cartaPorte.cereal);
            this.localidadProcedencia = new Localidad(cartaPorte.localidadProcedencia);
            this.turno = cartaPorte.turno;
            this.calidad = new Calidad(cartaPorte.calidad);
            this.plantaDestino = new Planta(cartaPorte.plantaDestino);
        } else {

            this.nroCarta = cartaPorte.PorteNro;
            this.nroVagon = cartaPorte.porteVagon;
            this.fechaDescarga = cartaPorte.porteFechaDes;
            this.patente = cartaPorte.portePatenteCamion;
            this.nroContrato = cartaPorte.nroContrato;
            this.kgNeto = cartaPorte.porteKgsNeto;
            this.observacion = cartaPorte.obsAnalisis;
            this.estadoCarta = new EstadoCarta({
                 //idEstadoCarta: this.getIdEstadoEstregaByIdEstadoPuerto(cartaPorte.estado.estado),
                 idEstadoCarta: cartaPorte.estado,
                 descripcion: cartaPorte.estadoPosiReal
            });


            if (cartaPorte.puertoDestino) {
                this.destino = new Destino({
                    cuit: cartaPorte.puertoDestino.ptoCuit,
                    descripcion: cartaPorte.puertoDestino.ptoRazon,
                    nroCarta: cartaPorte.nroCarta,
                    descripcionAbre: cartaPorte.puertoDestino.ptoRazon && cartaPorte.puertoDestino.ptoRazon.length > 5 ?
                        cartaPorte.puertoDestino.ptoRazon.substring(0, 3) : null
                });
            }
            this.codEntre = cartaPorte.entregador.cuit;
            this.kgNetoProcedencia = cartaPorte.porteKgsProcede;

            // Acá agrego los intervinientes a manopla
            this.intervinientes = []
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.titular.cuit,
                nombre: cartaPorte.titular.denominacion,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 0,
                    nombre: 'TITULAR'
                })
            }));
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.intermediario.cuit,
                nombre: cartaPorte.intermediario.denominacion,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 1,
                    nombre: 'INTERMEDIARIO'
                })
            }));
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.remCom.cuit,
                nombre: cartaPorte.remCom.denominacion,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 2,
                    nombre: 'REMITENTE_COMERCIAL'
                })
            }));
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.corredor.cuit,
                nombre: cartaPorte.corredor.denominacion,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 3,
                    nombre: 'CORREDOR_COMPRADOR'
                })
            }));
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.destinatario.cuit,
                nombre: cartaPorte.destinatario.denominacion,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 6,
                    nombre: 'DESTINATARIO'
                })
            }));
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.puertoDestino.ptoCuit,
                nombre: cartaPorte.puertoDestino.ptoRazon,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 7,
                    nombre: 'DESTINO'
                })
            }));
            this.intervinientes.push(new Interviniente({
                nroCuit: cartaPorte.intermediario.cuit,
                nombre: cartaPorte.intermediario.denominacion,
                tipoInterviniente: new TipoInterviniente({
                    idTipoInterviniente: 8,
                    nombre: 'INTERMEDIARIO_DEL_FLETE'
                })
            }));


            this.entregador = new Entregador({
                cuit: cartaPorte.entregador.cuit,
                nombre: cartaPorte.entregador.descripcion,
                idEntregador: cartaPorte.cuit,
                nombreCorto: cartaPorte.entregador.descripcion && cartaPorte.entregador.descripcion.length > 5 ?
                    cartaPorte.entregador.descripcion.substring(0, 3) : null
            });

            this.cereal = new Cereal({
                idCereal: 0,
                nombre: cartaPorte.cereal
            });

            this.localidadProcedencia = new Localidad({
                ncLocalidad: cartaPorte.procedencia.cod,
                descripcion: cartaPorte.procedencia.denominacion
            });

            this.turno = cartaPorte.porteTurno;

            this.calidad = new Calidad({
                idCalidad: 0,
                descripcion: cartaPorte.calidadCldNomenclatura,
                descripcionCorta: cartaPorte.calidadCldNomenclatura
            });

            this.plantaDestino = new Planta({
                idPlanta: cartaPorte.puertoDestino.ptoCuit,
                descripcion: cartaPorte.puertoDestino.ptoRazon,
                direccion: "",
                localidad: new cartaPorte()
            });

            this.plantaProcedencia = new Planta({
                idPlanta: cartaPorte.procedencia.cod,
                descripcion: cartaPorte.procedencia.denominacion,
                direccion: "",
                localidad:  new cartaPorte(),
              });
            this.estadoPosiReal = cartaPorte.estadoPosiReal;
            this.porteEstado = cartaPorte.porteEstado;

            this.portePrefijo = cartaPorte.portePrefijo;
            this.porteCodPuerto = cartaPorte.porteCodPuerto;
            this.puertoDestino = cartaPorte.puertoDestino;
            this.especie = cartaPorte.especie;
            this.entreCp = cartaPorte.entreCp;
            this.porteTipo = cartaPorte.porteTipo;

            this.analisis = cartaPorte.analisis;
        }
    }

    setEstadoCarta(estado: EstadoCarta) {
        this.estadoCarta = estado;
    }

    /**
     * Obtengo el id del estado de entrega segun el id de un estado en puertos
     */
    getIdEstadoEstregaByIdEstadoPuerto = (idEstadoPuerto: number) =>
        idEstadoPuerto === 1 ? 2 :  // Demorado      |       Demorado
        idEstadoPuerto === 2 ? 6 :  // A Descargar   |       A Descargar
        idEstadoPuerto === 4 ? 7 :  // Autorizado
        idEstadoPuerto === 7 ? 4 :  // Desvio/Desviado
        idEstadoPuerto === 10 ? 1 : // Pendiente Autorizacion | Entrega Autorizado
        idEstadoPuerto === 11 ? 9 : // Pendiente Desvio| Entrega Desvio
        1                           // Posicion para todo el resto

    // Retorno el interviniente por su tipo. Ejemplo: "TITULAR"
    getIntervinienteByTipo(tipo: string) {
        let c: Interviniente;

        this.intervinientes.forEach(inter => {
            if (inter.tipoInterviniente.nombre === tipo) {
                const intervinienteBuscado = inter;
                return intervinienteBuscado;
            }else{
              return '';
            }
        });


    }
}

