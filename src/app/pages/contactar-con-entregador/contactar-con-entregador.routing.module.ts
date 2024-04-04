import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactarConEntregadorPage } from './contactar-con-entregador';

const routes: Routes = [
  {
    path: '',
    component: ContactarConEntregadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactarConEntregadorRoutingModule {}
