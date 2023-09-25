import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarCamionPage } from './buscar-camion.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarCamionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarCamionPageRoutingModule {}
