import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';

import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEExplotacion } from 'src/app/servicios/beans/interfaces/explotacion.interface';

@Component({
  templateUrl: 'listado.html',
})
export class ListaExplotaciones {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayExplotaciones: Array<IEExplotacion>;

  	constructor(protected router: Router,public explotacion: ExplotacionServicio, protected params: ActivatedRoute) {
	}

	ngOnInit(){
		this.arrayExplotaciones=new Array<IEExplotacion>();
	}

	ionViewWillEnter(){
		if (this.explotacion.explotaciones != null && this.explotacion.explotaciones.length>0){
			this.arrayExplotaciones=this.explotacion.explotaciones;
		}else if (this.params.snapshot.queryParams.explotaciones!=null){
			this.explotacion.obtenerDatosExplotacionesIds(
				JSON.parse(this.params.snapshot.queryParams.explotaciones)).then((data: Array<IEExplotacion>) => {
				if (!this.explotacion.explotaciones){
				  this.explotacion.explotaciones= new Array<IEExplotacion>();
				}
				this.explotacion.explotaciones = data;
				this.arrayExplotaciones = this.explotacion.explotaciones;
			  }).catch((error) => {
				console.error(error);
				this.crearExplotacion();
			  });

		}
	}


	public seleccionarExplotacion(explo:IEExplotacion){
		this.explotacion.explotacionSeleccionada=explo;
		this.router.navigate(['ganadero/listado-ganado'],{queryParams:{"explotacionID":explo.id}});
	}

	public crearExplotacion(){
 		this.router.navigate(['ganadero/explotacion-detalle', false ]);
	}

}
