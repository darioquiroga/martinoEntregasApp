
import { Injectable } from '@angular/core';
import { Configuraciones } from '../shared/constants/configuraciones';
import { CartaPortePosicion } from '../modelo/cartaPortePosicion';
import { PuertosService } from './puertos.service';
import { estadosCartaPosicion } from '../shared/constants/estadosCartaPorte';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class ResponsiveTableService {

  constructor(
    private puertosService: PuertosService
  ) { }
   // Hace el infinte scroll top

   doInfiniteScrollTop(
    evento: { scrollTop: number; },
    lastScrollTop: number,
    completeTableData: any[],
    parcialTableData: any[],
    busquedaActiva: any,
    estadosToggleCarta: boolean[],
    activeFilters?: { destino: any; estado: any; }
) {
    if (
        evento.scrollTop <= 220 &&
        evento.scrollTop < lastScrollTop &&
        completeTableData.indexOf(parcialTableData[0]) != 0 &&
        ((activeFilters && !activeFilters.destino && !activeFilters.estado) || !activeFilters) &&
        !busquedaActiva
    ) {
        return {
            newEstadosToggleCarta: this.closeToggles(estadosToggleCarta),
            newParcialTableData: this.doLazyLoad(
                parcialTableData,
                completeTableData,
                'top'
            ),
            toScrollCord: [0, 250, 0]
        }
    }
    return {
      newEstadosToggleCarta: this.closeToggles(estadosToggleCarta),
      newParcialTableData: this.doLazyLoad(
          parcialTableData,
          completeTableData,
          'top'
      ),
      toScrollCord: [0, 250, 0]
  }

}


// Obtiene una particion inicial de la tabla completa de cartas
getInitParcialTable(data: CartaPortePosicion[]) {
    return data.slice(0, Configuraciones.lazyLoadSize);1
}
getInitFilterByEstado(completeTableData: CartaPortePosicion[], estado: String) {
  const origen = completeTableData;
  const filtrados = origen.filter((item) => item.estadoCarta.descripcion == estado);

  return filtrados;
//  return completeTableData.slice(0, Configuraciones.lazyLoadSize);

}

/**
* @description Corto los 20 items siguientes de completeTableData y los agrego a parcialTableData
* @argument parcialTableData
* @argument completeTableData
*/
doLazyLoad(parcialTableData: CartaPortePosicion[], completeTableData: CartaPortePosicion[], topOrBottom: string) {
    // Los índices de búsqueda
    let sliceDesde : any;
    let sliceHasta : any;
    // Indice (en la tabla completa) del último elemento de la tabla parcial

    if (topOrBottom === 'bottom') {
        sliceDesde = completeTableData.indexOf(
            parcialTableData[parcialTableData.length - 1]
        ) - Configuraciones.lazyLoadSize;
        sliceHasta = completeTableData.indexOf(
            parcialTableData[parcialTableData.length - 1]
        ) + Configuraciones.lazyLoadSize;
    } else if (topOrBottom === 'top') {
        sliceDesde = completeTableData.indexOf(
            parcialTableData[0]
        ) - Configuraciones.lazyLoadSize;
        sliceHasta = completeTableData.indexOf(
            parcialTableData[0]
        ) + Configuraciones.lazyLoadSize;
    }

    // Verifico que sliceDesde no se valla a menos de 0
    if (sliceDesde < 0) {
        sliceDesde = 0;
    }

    // Si sliceHasta es mayor al tamaño de la tabla completa, entonces corto hasta sliceHasta.length nomas
    if (sliceHasta > completeTableData.length) {
        sliceHasta = completeTableData.length;
    }

    return completeTableData.slice(sliceDesde, sliceHasta);
}


// Define todos los estados de los toggles en false
closeToggles(estadosToggleCarta: boolean[]) {
    return estadosToggleCarta.fill(false);
}

// Retorna un array de estados de toggle nuevo con todo en false
initToggles(lengthCompleteTableData: any) {
    return Array(lengthCompleteTableData).fill(false);
}

// En esta funcion se busca solo por nroCarta o Patente
searchByNroCartaOrPatente(ev: { target: { value: any; }; }, completeTableData: CartaPortePosicion[]) {

    let text = _.toLower(ev.target.value);


    // Defino el estado 'busquedaActiva'
    let busquedaActiva;
    let parcialTableEncontrada;

    // Si el text buscado es '' entonces la búsqueda deja de estar activa
    if (text === '') {
        // Desactivo la busqueda
        busquedaActiva = false;
        // Retorno la parcial table inicial
        parcialTableEncontrada = this.getInitParcialTable(completeTableData);
    } else {
        // Activo la busqueda
        busquedaActiva = true;
        // Busco la parcialTable nueva
        parcialTableEncontrada = completeTableData.filter((cp:CartaPortePosicion) => {
            let booleanDeRetorno: boolean = false;

            // Me fijo si text está en la patente o en el nroCarta
            if (
                (cp.patente && cp.patente.toLowerCase().includes(text.toLowerCase())) ||
                (cp.nroCarta.toString().includes(text))
            ) {
                booleanDeRetorno = true;
            }

            return booleanDeRetorno;
        });
    };

    // Creo la respuesta
    const objetoRespuesta = {
        busquedaActiva: busquedaActiva,
        parcialTableEncontrada: parcialTableEncontrada
    };

    return objetoRespuesta;

}


// Checkea si el infinte scroll de arriba (el spinner) esta activo, fijándose si el 1er elemento de la tabla parcial ES el primer elemento de la tabla completa.
// Si no es, entonces TENGO que mostrar el spinner de arriba
checkIfSpinnerTopIsOn(completeTableData: string | any[], parcialTableData: any[]) {

    return (completeTableData && parcialTableData) ?
        completeTableData.indexOf(parcialTableData[0]) != 0 :
        false;
}

 // Obtiene la class del color de la carta
getColorEstado(cartaPorte: any) {

    const isPuertos = this.puertosService.getIfPuertos();

    // Si NO TIENE estadoCarta, quiere decir que es de Descarga (Estado Descargado) (estado-default)
    // Ejemplo: Si llega estadoCarta.descripcion = 'Pendiente_Desvio' retorna 'estado-pendiente-desvio'
    return isPuertos ? (
        (!cartaPorte || !cartaPorte.estadoPosiReal) || [
            'Descargado',
            'Ingreso',
            'A Descargar',
            'Calado',
            'Gerencia',
            'Laboratorio',
            'Rec Oficial'
        ].includes(cartaPorte.estadoPosiReal) ?
            `estado-default` :
            `estado-${cartaPorte.estado.descripcion.toLowerCase().replace(' ', '-')}`
    ) : (
        (!cartaPorte || !cartaPorte.estadoCarta || !cartaPorte.estadoCarta.idEstadoCarta) || [
            estadosCartaPosicion.Descargado,
            estadosCartaPosicion.Ingreso,
            estadosCartaPosicion.A_Descargar,
            estadosCartaPosicion.Descargado_Pendiente
        ].includes(cartaPorte.estadoCarta.idEstadoCarta) ?
            `estado-default` :
            `estado-${cartaPorte.estadoCarta.descripcion.toLowerCase().replace(' ', '-')}`
    )
}

// Le doy un formato mas lindo al tipo de interviniente
formatTipoInterviniente(tipoInterviniente: string) {
    if (tipoInterviniente === 'CORREDOR_COMPRADOR') {
        return 'corredor';
    }
    return tipoInterviniente.replace('_', ' ').toLowerCase();
}
}
