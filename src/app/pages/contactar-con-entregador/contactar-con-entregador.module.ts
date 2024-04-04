import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactarConEntregadorRoutingModule } from './contactar-con-entregador.routing.module';

import { ContactarConEntregadorPage } from './contactar-con-entregador';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactarConEntregadorRoutingModule
  ],
  declarations: [ContactarConEntregadorPage]
})
export class ContactarConEntregadorModule {}
