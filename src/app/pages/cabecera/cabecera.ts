import { Usuario } from './../../servicios/beans/usuario';
import { UsuarioServicio } from 'src/app/servicios/usuario.service';
import { IEUsuario } from 'src/app/servicios/beans/interfaces/usuario.interface';
import { IEExplotacion } from './../../servicios/beans/interfaces/explotacion.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector:'cabecera-ganadero',
  templateUrl: 'cabecera.html'
})
export class Cabecera {

  @Input() nombrePagina:string;


  constructor() {
	}

}
