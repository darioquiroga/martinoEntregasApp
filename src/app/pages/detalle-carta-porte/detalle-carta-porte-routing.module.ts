import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCartaPortePage } from './detalle-carta-porte.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCartaPortePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCartaPortePageRoutingModule {}
