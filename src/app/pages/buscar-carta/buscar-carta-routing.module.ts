import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarCartaPage } from './buscar-carta.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarCartaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarCartaPageRoutingModule {}
