import {Injectable} from '@angular/core';
import {URLSearchParams,Http} from '@angular/http';
import {Explotacion} from './beans/explotacion';
import {Animal} from './beans/animal';
import {Compra} from './beans/compra';
import {Venta} from './beans/venta';
import 'rxjs/add/operator/map'


@Injectable()
export class ServicioCompraVenta {

	compra:boolean;

	arrayAnimales:Array<Animal>;

	totalDinero:number;

	constructor(compra:boolean){
		this.compra=compra;
		this.totalDinero=0;
		this.arrayAnimales=new Array<Animal>();
	}

	public anadirAnimal(anim:Animal){
		this.arrayAnimales.push(anim);
		if (this.compra){
			this.totalDinero+=anim.getPrecioCompra();
		}else{
			this.totalDinero+=anim.getPrecioVenta();
		}
	}

	public crearOperacion(agrupacion:string){
		let url="";
		let dato
		if (this.compra){
			let dato=new Compra(null,agrupacion,this.arrayAnimales,this.totalDinero,new Date());
			url="/ruta/fantastica/compra";
		}else{
			let dato=new Venta(null,agrupacion,this.arrayAnimales,this.totalDinero,new Date());
			url="/ruta/fantastica/venta";
		}
	}

}