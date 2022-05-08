import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltroAvanzadoComponentPage } from './filtro-avanzado-component.page';

const routes: Routes = [
  {
    path: '',
    component: FiltroAvanzadoComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltroAvanzadoComponentPageRoutingModule {}
