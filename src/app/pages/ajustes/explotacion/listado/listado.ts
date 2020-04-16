import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';

import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { IEExplotacion } from 'src/app/servicios/beans/interfaces/explotacion.interface';

@Component({
  templateUrl: 'listado.html',
})
export class ListaExplotaciones {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayExplotaciones: Array<IEExplotacion>;

  	constructor(protected router: Router,public explotacion: ExplotacionServicio) {
	}

	ngOnInit(){
		this.arrayExplotaciones=new Array<IEExplotacion>();
	}

	ionViewWillEnter(){
		this.arrayExplotaciones=this.explotacion.explotaciones;
	}

	
	protected seleccionarExplotacion(explo:IEExplotacion){
		this.router.navigate(['ganadero/listado-ganado'],{queryParams:{"explotacion":JSON.stringify(explo)}});
	}  

	protected crearExplotacion(){
 		this.router.navigate(['ganadero/explotacion-detalle']);
	}

}
