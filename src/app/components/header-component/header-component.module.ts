import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header-component.component';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    HeaderComponent
  ],
})
export class HeaderComponentModule {}