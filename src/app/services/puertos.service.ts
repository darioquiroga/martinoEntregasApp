
import { Injectable } from '@angular/core';
import { tiposUsuarios } from '../shared/constants/tiposUsuarios';
import { CartaPortePosicion } from '../modelo/cartaPortePosicion';
import { UiService } from './ui.service';
@Injectable({
  providedIn: 'root'
})
export class PuertosService {
  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  constructor(
    private uiService : UiService
  ) {

  }
  /**
     * Retorna TRUE si el usuario activo es tipo PUERTOS
     */

  getIfPuertos = () => {
    if (typeof this.usuarioActivoJson === 'string') {
      const usuarioActivo: any = this.uiService.getUsuarioActivoSync();

      return usuarioActivo && usuarioActivo.tipo && usuarioActivo.tipo.id === tiposUsuarios.PUERTOS;

    }

}

checkIfAccionable = (carta: any) => {
    return (
        this.getIfPuertos() &&
        (!carta.entreCp || carta.entreCp.length === 0) &&
        (
            (carta.porteEstado === 5 && carta.estado.estado === 0) ||
            (carta.porteEstado === 3 && carta.estado.estado === 1)
        ) &&
        (carta.porteTipo !== 3)
    )
}








}
