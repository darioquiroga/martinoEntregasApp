import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamioneroRegistroPage } from './camionero-registro.page';

const routes: Routes = [
  {
    path: '',
    component: CamioneroRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamioneroRegistroPageRoutingModule {}
