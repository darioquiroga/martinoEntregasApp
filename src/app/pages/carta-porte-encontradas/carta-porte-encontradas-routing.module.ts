import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaPorteEncontradasPage } from './carta-porte-encontradas.page';

const routes: Routes = [
  {
    path: '',
    component: CartaPorteEncontradasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaPorteEncontradasPageRoutingModule {}
