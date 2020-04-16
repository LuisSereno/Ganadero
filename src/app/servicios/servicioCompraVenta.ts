import { IEAnimal } from './beans/interfaces/animal.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Explotacion} from './beans/explotacion';
import {ServicioDatos} from './serviciodatos'
//import {ServicioFicheros} from './servicioFicheros'
import {Animal} from './beans/animal';
import {Compra} from './beans/compra';
import {Venta} from './beans/venta';
import {Operacion} from './beans/operacion';
import {FuncionesGenerales} from './genericos/funcionesGenerales';
import {Hembra} from './beans/hembra';
import {Macho} from './beans/macho';
import {Constantes} from './genericos/constantes';

@Injectable()
export class ServicioCompraVenta {

	compra:boolean;

	arrayAnimales:Array<IEAnimal>;

	totalDinero:number;

    private httpLocal:HttpClient;

	constructor(private servDatos:ServicioDatos,http: HttpClient){
		this.totalDinero=0;
		this.arrayAnimales=new Array<Animal>();
		this.httpLocal=http;
	}

	esCompra(compra:boolean){
		this.compra=compra;
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
		let url="/ganadero/compraventa";
		var guardadoCorrecto:boolean=false;
		try{

			if (operacion instanceof Venta){
				
				if (this.servDatos.getExplotacion().arrayVentas){
					this.servDatos.getExplotacion().arrayVentas.push(operacion);
				}else{
					let arrayVentas:Array<Venta>=new Array<Venta>();
					arrayVentas.push(operacion);
					this.servDatos.getExplotacion().arrayVentas = arrayVentas;
				}

				if (operacion.animales){
					for (let anim of operacion.animales){
						let resultado:boolean=FuncionesGenerales.buscaBorraArray(this.servDatos.getExplotacion().arrayHembras,anim);
						if (!resultado){
							FuncionesGenerales.buscaBorraArray(this.servDatos.getExplotacion().arrayMachos,anim);
						}
						anim.ascendencia = null;
						anim.descendencia = null;
					}
				}
			}else if (operacion instanceof Compra){
				if (this.servDatos.getExplotacion().arrayCompras){
					this.servDatos.getExplotacion().arrayCompras.push(operacion);
				}else{
					let arrayCompras:Array<Compra>=new Array<Compra>();
					arrayCompras.push(operacion);
					this.servDatos.getExplotacion().arrayCompras = arrayCompras;
				}

				if (operacion.animales){
					for (let anim of operacion.animales){
 						if (anim instanceof Macho){
 							this.servDatos.getExplotacion().arrayMachos.push(anim);
 						}else if (anim instanceof Hembra){
							this.servDatos.getExplotacion().arrayHembras.push(anim);
 						}
					}
				}

			}else{
				throw "No es una operacion";
			}
			console.log(operacion.toJSON());
			var headers=new HttpHeaders();
			//ServicioFicheros.createAuthorizationHeader(headers);
			this.httpLocal.post(Constantes.URL_WEBSERVICES +url, {compraVentas: [operacion.toJSON()],idExplotacion:this.servDatos.getExplotacion().id},
				{headers: headers}).subscribe((data:any) => {
		        operacion.id = data.content;
		        if (operacion instanceof Compra){
		        	for (let indice in data.contentSecundario){
		        		operacion.animales[indice].setId(data.contentSecundario[indice]);
		        	}
				 }
				 
		        console.log("todo correcto");
		      },err => {
		          console.error("Errr al obtener los datos de la venta!");
		          console.error(err);
		      });			
			guardadoCorrecto=true;
	    }catch(ex){
	      console.log(ex);
	    }

	    return guardadoCorrecto;

	}


}