import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaPorteEncontradasPageRoutingModule } from './carta-porte-encontradas-routing.module';

import { CartaPorteEncontradasPage } from './carta-porte-encontradas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaPorteEncontradasPageRoutingModule
  ],
  declarations: [CartaPorteEncontradasPage]
})
export class CartaPorteEncontradasPageModule {}
