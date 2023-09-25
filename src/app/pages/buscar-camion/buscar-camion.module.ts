import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarCamionPageRoutingModule } from './buscar-camion-routing.module';

import { BuscarCamionPage } from './buscar-camion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarCamionPageRoutingModule
  ],
  declarations: [BuscarCamionPage]
})
export class BuscarCamionPageModule {}
