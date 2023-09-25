import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCartaPortePageRoutingModule } from './detalle-carta-porte-routing.module';

import { DetalleCartaPortePage } from './detalle-carta-porte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCartaPortePageRoutingModule
  ],
  declarations: [DetalleCartaPortePage]
})
export class DetalleCartaPortePageModule {}
