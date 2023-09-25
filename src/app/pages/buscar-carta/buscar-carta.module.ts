import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarCartaPageRoutingModule } from './buscar-carta-routing.module';

import { BuscarCartaPage } from './buscar-carta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarCartaPageRoutingModule
  ],
  declarations: [BuscarCartaPage]
})
export class BuscarCartaPageModule {}
