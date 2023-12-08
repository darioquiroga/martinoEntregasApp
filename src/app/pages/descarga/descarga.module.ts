import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescargaPageRoutingModule } from './descarga-routing.module';
import { PipesModule } from "../../pipes/pipes.module";
import { HeaderComponentModule } from "../../components/header-component/header-component.module";
import { UserComponentModule } from 'src/app/components/user-component/user-component.module';
import { DescargaPage } from './descarga.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescargaPageRoutingModule,
    PipesModule,
    HeaderComponentModule,
    UserComponentModule
  ],
  declarations: [DescargaPage]
})
export class DescargaPageModule {}
