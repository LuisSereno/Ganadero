import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/ganadero/ganadero.module').then(m => m.GanaderoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'filtro-avanzado-component',
    loadChildren: () => import('./pages/filtro-avanzado-component/filtro-avanzado-component.module').then( m => m.FiltroAvanzadoComponentPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
