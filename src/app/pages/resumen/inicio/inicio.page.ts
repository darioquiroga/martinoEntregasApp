import { AppComponent } from './../../../app.component';

import { Component,   NgZone, OnInit, ViewChild, inject } from '@angular/core';
import {  IonContent, IonFab  } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// Constantes y otros
import { estadosCartaPosicion } from '../../../shared/constants/estadosCartaPorte';
import { estadosCartaPosicionPuertos } from '../../../shared/constants/estadosCartaPorte';

// Modelos
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { Usuario } from 'src/app/modelo/usuario';

// Services
import { PosicionDiaService } from 'src/app/services/posicion-dia.service';
import { UiService } from 'src/app/services/ui.service';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
import { PuertosService } from 'src/app/services/puertos.service';




// textos
import { textos } from 'src/app/shared/textos/textos';
import {
  LoadingController,
  MenuController,
  NavController,
  Platform,
} from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,

} from '@capacitor/push-notifications';

//import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Configuraciones }  from '../../../shared/constants/configuraciones';
import * as _ from 'lodash';
import { async } from 'rxjs';


//import { posicionDiaAnimations } from './posicionDiaAnimations';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],

})
export class InicioPage  {

  constructor(




  ) {


  }

}


