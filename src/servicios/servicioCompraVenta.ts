import {Injectable} from '@angular/core';
import {URLSearchParams,Http} from '@angular/http';
import {Explotacion} from './beans/explotacion';
import {ServicioDatos} from './serviciodatos'
import {Animal} from './beans/animal';
import {Compra} from './beans/compra';
import {Venta} from './beans/venta';
import {Operacion} from './beans/operacion';
import 'rxjs/add/operator/map'
import {FuncionesGenerales} from './funcionesGenerales';
import {Hembra} from './beans/hembra';
import {Macho} from './beans/macho';
import {Constantes} from './constantes';

@Injectable()
export class ServicioCompraVenta {

	compra:boolean;

	arrayAnimales:Array<Animal>;

	totalDinero:number;

    private httpLocal:Http;

	constructor(private servDatos:ServicioDatos,http: Http){
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
		let url="/ganadero/compraventa/anadir";
		var guardadoCorrecto:boolean=false;
		try{

			if (operacion instanceof Venta){
				
				if (this.servDatos.getExplotacion().getArrayVentas()){
					this.servDatos.getExplotacion().getArrayVentas().push(operacion);
				}else{
					let arrayVentas:Array<Venta>=new Array<Venta>();
					arrayVentas.push(operacion);
					this.servDatos.getExplotacion().setArrayVentas(arrayVentas);
				}

				if (operacion.getAnimales()){
					for (let anim of operacion.getAnimales()){
						let resultado:boolean=FuncionesGenerales.buscaBorraArray(this.servDatos.getExplotacion().getArrayHembras(),anim);
						if (!resultado){
							FuncionesGenerales.buscaBorraArray(this.servDatos.getExplotacion().getArrayMachos(),anim);
						}
						anim.setAscendencia(null);
						anim.setDescendencia(null);
					}
				}
			}else if (operacion instanceof Compra){
				if (this.servDatos.getExplotacion().getArrayCompras()){
					this.servDatos.getExplotacion().getArrayCompras().push(operacion);
				}else{
					let arrayCompras:Array<Compra>=new Array<Compra>();
					arrayCompras.push(operacion);
					this.servDatos.getExplotacion().setArrayCompras(arrayCompras);
				}

				if (operacion.getAnimales()){
					for (let anim of operacion.getAnimales()){
 						if (anim instanceof Macho){
 							this.servDatos.getExplotacion().getArrayMachos().push(anim);
 						}else if (anim instanceof Hembra){
							this.servDatos.getExplotacion().getArrayHembras().push(anim);
 						}
					}
				}

			}else{
				throw "No es una operacion";
			}
			console.log(operacion.toJSON());
			this.httpLocal.post(Constantes.URL_WEBSERVICES +url, {compraVentas: [operacion.toJSON()],idExplotacion:this.servDatos.getExplotacion().getId()}).map(res => res.json()).subscribe(data => {
		        operacion.setId(data.content);
		        if (operacion instanceof Compra){
		        	for (let indice in data.contentSecundario){
		        		operacion.getAnimales()[indice].setId(data.contentSecundario[indice]);
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