import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamioneroRegistroPageRoutingModule } from './camionero-registro-routing.module';

import { CamioneroRegistroPage } from './camionero-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamioneroRegistroPageRoutingModule
  ],
  declarations: [CamioneroRegistroPage]
})
export class CamioneroRegistroPageModule {}
