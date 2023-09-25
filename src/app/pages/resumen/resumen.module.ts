import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenPageRoutingModule } from './resumen-routing.module';

import { ResumenPage } from './resumen.page';
import { PipesModule } from "../../pipes/pipes.module";
import { HeaderComponentModule } from "../../components/header-component/header-component.module";
import { UserComponentModule } from 'src/app/components/user-component/user-component.module';

@NgModule({
    declarations: [ResumenPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ResumenPageRoutingModule,
        PipesModule,
        HeaderComponentModule,
        UserComponentModule
    ]
})
export class ResumenPageModule {}
