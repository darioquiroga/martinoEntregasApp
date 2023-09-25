import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { PipesModule } from "../../../pipes/pipes.module";
import { HeaderComponentModule } from "../../../components/header-component/header-component.module";
import { UserComponentModule } from 'src/app/components/user-component/user-component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    PipesModule,
    HeaderComponentModule,
    UserComponentModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}

