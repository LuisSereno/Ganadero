import {Injectable} from '@angular/core';
import {URLSearchParams,Http} from '@angular/http';
import {Explotacion} from './beans/explotacion';
import {ServicioDatos} from './serviciodatos'
import {Animal} from './beans/animal';
import {Compra} from './beans/compra';
import {Venta} from './beans/venta';
import {Operacion} from './beans/operacion';
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


	public crearOperacion(operacion:Operacion){
		let url="";
		var guardadoCorrecto:boolean=false;
		try{

			if (operacion instanceof Venta){
				url="/ruta/fantastica/venta"
				if (this.servDatos.getExplotacion().getArrayVentas()){
					this.servDatos.getExplotacion().getArrayVentas().push(operacion);
				}else{
					let arrayVentas:Array<Venta>=new Array<Venta>();
					arrayVentas.push(operacion);
					this.servDatos.getExplotacion().setArrayVentas(arrayVentas);
				}

			}else if (operacion instanceof Compra){
				url="/ruta/fantastica/compra"
				if (this.servDatos.getExplotacion().getArrayCompras()){
					this.servDatos.getExplotacion().getArrayCompras().push(operacion);
				}else{
					let arrayCompras:Array<Compra>=new Array<Compra>();
					arrayCompras.push(operacion);
					this.servDatos.getExplotacion().setArrayCompras(arrayCompras);
				}
			}else{
				throw "No es una operacion";
			}
			//this.httpLocal.post(url, {venta: venta.toJSON(),idExplotacion:this.servDatos.getExplotacion().getId()}).map(res => res.json());
			guardadoCorrecto=true;
	    }catch(ex){
	      console.log(ex);
	    }

	    return guardadoCorrecto;

	}


}