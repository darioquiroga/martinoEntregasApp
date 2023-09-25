import { Component, Input, OnInit } from '@angular/core';
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { UiService } from 'src/app/services/ui.service';
import { CartaPorteHistoria } from 'src/app/modelo/cartaPorteHistoria';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-detalle-carta-porte',
  templateUrl: './detalle-carta-porte.page.html',
  styleUrls: ['./detalle-carta-porte.page.scss'],
})
export class DetalleCartaPortePage implements OnInit {
  // Spinner
  loading: boolean = false;
// Estados de cartas expandidas o contraidas
  estadosToggleCarta: boolean[] = [];

// Cartas encontradas
cartaDePorte: any;//CartaPorteHistoria[] = [];

  //@Input() cartaDePorte: any //CartaPorteHistoria;
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private uiService: UiService ) {


      if (!this.cartaDePorte) {
        this.cartaDePorte =history.state.cartasEncontradas;
    }



     }
     // Le doy un formato mas lindo al tipo de interviniente
    formatTipoInterviniente(tipoInterviniente: string) {
      return tipoInterviniente.replace('_', ' ').toLowerCase();
  }

  // Formatea la cosecha, le pone una / entre medio
  formatCosecha(cosecha: string) {
      // Si NO tiene / entre los caracteres..
      if (cosecha.indexOf('/') === -1) {
          return this.uiService.insertString(2, cosecha, '/');
      }else{
        return cosecha
        }
  }

  ngOnInit() {
  }

}
