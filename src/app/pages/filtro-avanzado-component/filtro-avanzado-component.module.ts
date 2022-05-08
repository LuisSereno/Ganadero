import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltroAvanzadoComponentPageRoutingModule } from './filtro-avanzado-component-routing.module';

import { FiltroAvanzadoComponentPage } from './filtro-avanzado-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroAvanzadoComponentPageRoutingModule
  ],
  declarations: [FiltroAvanzadoComponentPage]
})
export class FiltroAvanzadoComponentPageModule {}
