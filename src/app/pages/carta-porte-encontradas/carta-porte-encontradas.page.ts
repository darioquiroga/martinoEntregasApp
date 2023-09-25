import { Component, OnInit } from '@angular/core';
import { CartaPorteHistoria } from 'src/app/modelo/cartaPorteHistoria';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-carta-porte-encontradas',
  templateUrl: './carta-porte-encontradas.page.html',
  styleUrls: ['./carta-porte-encontradas.page.scss'],
})
export class CartaPorteEncontradasPage implements OnInit {
// Spinner
  loading: boolean = false;
// Estados de cartas expandidas o contraidas
  estadosToggleCarta: boolean[] = [];

// Cartas encontradas
  cartasEncontradas: any;//CartaPorteHistoria[] = [];
  constructor(
    private uiService: UiService,
    public responsiveTableService: ResponsiveTableService,) {
      if (!this.cartasEncontradas) {
        this.cartasEncontradas =history.state.cartasEncontradas.data;
    }

    // Inicializo los estados toggle de las cartas en false
    this.estadosToggleCarta = Array(this.cartasEncontradas.length).fill(false);

    }
// Abre o cierra la info extra de una carta de porte
toggleState(indice: any) {
  this.estadosToggleCarta[indice] = !this.estadosToggleCarta[indice];
}
// Obtiene un string con el destino y la planta fusionados, lo que sería el puerto
getPuerto(carta: any) {

  /*let nombreDestinoAcortado = this.uiService.getFirstWordOfString(carta.getIntervinienteByTipo('DESTINO').nombre);

  if (nombreDestinoAcortado && carta.plantaDestino.descripcion) {
      return `${nombreDestinoAcortado}, ${carta.plantaDestino.descripcion}`;
  } else if (nombreDestinoAcortado && !carta.plantaDestino.descripcion) {
      return `${nombreDestinoAcortado}`;
  } else if (!nombreDestinoAcortado && carta.plantaDestino.descripcion) {
      return `${carta.plantaDestino.descripcion}`;
  } else {
      return '';
  }*/
  return `${carta.plantaDestino.descripcion}`;
}

  ngOnInit() {
    alert("Cartas de Porte encontradas")
  }

}
