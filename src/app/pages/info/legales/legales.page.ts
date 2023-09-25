import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

import {
  LoadingController,
  MenuController,
} from '@ionic/angular';
@Component({
  selector: 'app-legales',
  templateUrl: './legales.page.html',
  styleUrls: ['./legales.page.scss'],
})
export class LegalesPage implements OnInit {

  constructor( private menuController: MenuController,
    private menuCtrl : MenuController,private navController: NavController,) { }


  terminosYCondiciones(){
    this.navController.navigateRoot('/terminos-condiciones');
 }

 politicaPrivacidad(){
  this.navController.navigateRoot('/politica');
  }
  ngOnInit() {
  }

}
