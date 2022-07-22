import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from '../home/home.page';
import { ListaGanado } from '../listadoGanado/listado';
import { ListaVentas } from '../listadoVentas/listado';
import { ListadoAnimalesVendidos } from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos';
import { PerfilAutenticacion } from '../profile/profile';
import { Nuevo } from '../nuevo/nuevo';
import { Detalle } from '../detalle/detalle';
import { Informes } from '../informes/informes';
import { AscDesc } from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia';
import { ListaDocumentos } from '../listadoDocumentos/listado';
import { DetalleExplotacion } from '../ajustes/explotacion/nueva/nueva';
import { ListaExplotaciones } from '../ajustes/explotacion/listado/listado';
import { VacunasEnfermedadesPage } from '../listadoVacunasEnfermedades/listaVacunasEnfermedades';
import { DetalleVacunaEnfermedad } from '../listadoVacunasEnfermedades/nuevaVacunaEnfermedad/detalleVacunaEnfermedad';
import { OperacionComponent } from '../listadoVentas/operacion/operacion.component';

const routes: Routes = [
  {
    path: 'ganadero',
    children: [
      {
        path: 'home', component: HomePage
      },
      {
        path: 'listado-ganado', component: ListaGanado
      },
      {
        path: 'listado-ventas', component: ListaVentas
      },
      {
        path: 'listado-explotaciones', component: ListaExplotaciones
      },
      {
        path: 'listado-animales-vendidos', component: ListadoAnimalesVendidos
      },
      {
        path: 'perfil-autenticacion', component: PerfilAutenticacion
      },
      {
        path: 'animal-nuevo', component: Nuevo
      },
      {
        path: 'animal-detalle/:id', component: Detalle
      },
      {
        path: 'explotacion-detalle/:es_edicion', component: DetalleExplotacion
      },
      {
        path: 'informes', component: Informes
      },
      {
        path: 'listado-ascdesc-ganado', component: AscDesc
      },
      {
        path: 'listado-documentos', component: ListaDocumentos
      },
      {
        path: 'listado-vacunasenfermedades/:tipo', component: VacunasEnfermedadesPage
      },
      {
        path: 'detalle-vacunasenfermedades', component: DetalleVacunaEnfermedad
      },
      {
        path: 'operacion-nueva/:es_compra', component: OperacionComponent
      },
      {
        path: 'informes', component: Informes
      },
      {
        path: 'ganadero',
        redirectTo: '/ganadero/explotacion-detalle/false',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/ganadero',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanaderoPageRoutingModule {}
