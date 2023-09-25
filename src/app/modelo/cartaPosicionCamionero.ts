import { EstadoCarta } from "./estadoCarta";
import { Destino } from "./destino";
import { Entregador } from "./entregador";

export class CartaPosicionCamionero {
    destino!: Destino;
    nroCarta: number;
    patente: string;
    estado: EstadoCarta;
    entregador: Entregador;
    fromPuerto: boolean;
    entreCp;

    constructor (cartaPorte: any, isPuerto = false) {
        this.fromPuerto = isPuerto;

        if (!isPuerto) {
            // Si el destino existe
            if (cartaPorte.destino) {
                this.destino = new Destino(cartaPorte.destino);
            }
            this.nroCarta = cartaPorte.nroCarta;
            this.patente = cartaPorte.patente;
            this.estado = new EstadoCarta(cartaPorte.estadoCarta);
            this.entregador = new Entregador(cartaPorte.entregador);
        } else {
            this.estado = new EstadoCarta({
                idEstadoCarta: cartaPorte.estado.estado,
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

            this.nroCarta = cartaPorte.PorteNro;
            this.patente = cartaPorte.portePatenteCamion;

            this.entregador = new Entregador({
                cuit: cartaPorte.entregador.cuit,
                nombre: cartaPorte.entregador.descripcion,
                idEntregador: cartaPorte.cuit,
                nombreCorto: cartaPorte.entregador.descripcion && cartaPorte.entregador.descripcion.length > 5 ?
                    cartaPorte.entregador.descripcion.substring(0, 3) : null
            });

            this.entreCp = cartaPorte.entreCp;
        }
    }

    setEstadoCarta(estado: EstadoCarta) {
        this.estado = estado;
    }
}
