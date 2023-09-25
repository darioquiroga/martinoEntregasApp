import { NgModule } from '@angular/core';
import { UserComponent } from './user-component.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
 
@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserComponentModule {}