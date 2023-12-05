import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CartaPosicionCamionero } from 'src/app/modelo/cartaPosicionCamionero';

@Component({
  selector: 'app-buscar-camion',
  templateUrl: './buscar-camion.page.html',
  styleUrls: ['./buscar-camion.page.scss'],
})
export class BuscarCamionPage implements OnInit {
// Spinner
  loading: boolean = false;
nroCartaOPatenteBuscada:  string = '';
// Estados de cartas expandidas o contraidas
  estadosToggleCarta: boolean[] = [];
// Carta buscada bindeada en htmlring = '';
// Cartas encontradas en la consulta
  cartasEncontradas: CartaPosicionCamionero[] = [];
  constructor() { }
// Checkear si nroCartaBuscada tiene una letra (esto implicaría que es una patente, por lo cual debo mostrar las fechas de intervalo)
checkIfIsPatente() {
 /* if (this.nroCartaOPatenteBuscada.match(/[a-z]/i)) {
    return true;
  } else {
    return false;
  }*/
}
onClickBuscar(){
  alert("fdafd")
}
  ngOnInit() {

  }

}
