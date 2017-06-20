import {Injectable} from '@angular/core';
import {URLSearchParams,Http} from '@angular/http';
import {Explotacion} from './beans/explotacion';
import {ServicioDatos} from './serviciodatos'
import {Animal} from './beans/animal';
import {Compra} from './beans/compra';
import {Venta} from './beans/venta';
import 'rxjs/add/operator/map'

export class ServicioCompraVenta {

	compra:boolean;

	arrayAnimales:Array<Animal>;

	totalDinero:number;

	private httpLocal:Http;

	constructor(compra:boolean,private servDatos:ServicioDatos){
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

	public crearVenta(venta:Venta){
		let url="/ruta/fantastica/venta";
		var guardadoCorrecto:boolean=false;
		try{
	      //this.httpLocal.post(url, {venta: venta.toJSON(),idExplotacion:this.servDatos.getExplotacion().getId()}).map(res => res.json());

	      if (this.servDatos.getExplotacion().getArrayVentas()){
	        this.servDatos.getExplotacion().getArrayVentas().push(venta);
	      }else{
	      	let arrayVentas:Array<Venta>=new Array<Venta>();
	      	arrayVentas.push(venta);
	      	this.servDatos.getExplotacion().setArrayVentas(arrayVentas);
	      }
	      guardadoCorrecto=true;
	    }catch(ex){
	      console.log(ex);
	    }

	    return guardadoCorrecto;
	}


}