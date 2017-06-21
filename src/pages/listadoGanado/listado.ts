import { Component } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Venta} from '../../servicios/beans/venta'
import {Detalle} from '../detalle/detalle'
import {ListadoAnimalesVendidos} from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos'
import {Nuevo} from '../nuevo/nuevo'
import { NavController,NavParams } from 'ionic-angular';
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Constantes} from '../../servicios/constantes';

@Component({
  templateUrl: 'listado.html'
})
export class ListaGanado {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	tipoMostrado: string = "hembras";

	arrayHembras: Array<Hembra>;

	arrayMachos: Array<Macho>;

	checkedItemsHembras:boolean[];

	checkedItemsMachos:boolean[];

	venta:number;

  	constructor(public navCtrl: NavController,params: NavParams,public servicio: ServicioDatos) {
  		this.arrayHembras= new Array<Hembra>();
		this.arrayMachos= new Array<Macho>();
		this.venta=params.get("venta");
		if (this.venta==Constantes.COMPRA || this.venta==Constantes.VENTA){
			let animalesTotales:Array<Animal>=params.get("animales");
			if (animalesTotales){
				for (let anim of animalesTotales){
					if (anim instanceof Macho){
						this.arrayMachos.push(anim);
					}else if (anim instanceof Hembra){
						this.arrayHembras.push(anim);
					}
				}
			}
		}else if (this.venta==Constantes.VENTA_VENDER){
			this.arrayMachos=this.servicio.getExplotacion().getArrayMachos();
			this.arrayHembras=this.servicio.getExplotacion().getArrayHembras();
			this.checkedItemsHembras= new Array(this.arrayHembras.length);
			this.checkedItemsMachos= new Array(this.arrayMachos.length);
		}else{
			this.venta=Constantes.INDEFINIDO;
		}
	}

   ngOnInit() {
    	console.log("Se inicializala apliciacion con el ngOnInit");

    	if (this.venta==Constantes.INDEFINIDO){
			this.servicio.obtenerDatosGanado(this.servicio.getExplotacion().getId()).subscribe(data => {
				for (let mach of data.arrayMachos){
					let machito:Macho=Macho.fromJSON(mach);
					this.arrayMachos.push(machito);
				}
				for (let hem of data.arrayHembras){
					let hembrita:Hembra=Hembra.fromJSON(hem);
					this.arrayHembras.push(hembrita);
				}
				this.transformIdAnimal();
				this.servicio.getExplotacion().setArrayHembras(this.arrayHembras);
				this.servicio.getExplotacion().setArrayMachos(this.arrayMachos);
			},err => {
			    console.log("Errr al obtener los datos del ganado!");
			});
    	}
	}

	private transformIdAnimal(){
		var animalCompleto=null;
		for (let hem of this.arrayHembras){
			let arrayVacio:Array<Animal>=new Array<Animal>();
			if (hem.getAscendencia()!=null){
				for (let dat of hem.getAscendencia()){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.getId() === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.getId() === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}

					arrayVacio.push(dat);

				}
				hem.setAscendencia(arrayVacio)
			}
			if (hem.getDescendencia()!=null){
				for (let dat of hem.getDescendencia()){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.getId() === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.getId() === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}
					arrayVacio.push(dat);
				}
				hem.setDescendencia(arrayVacio)
			}
		}
		for (let mach of this.arrayMachos){
			let arrayVacio:Array<Animal>=new Array<Animal>();
			if (mach.getAscendencia()!=null){
				for (let dat of mach.getAscendencia()){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.getId() === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.getId() === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}	
					arrayVacio.push(dat);
				}
				mach.setAscendencia(arrayVacio)
			}
			if (mach.getDescendencia()!=null){
				for (let dat of mach.getDescendencia()){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.getId() === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.getId() === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}	
					arrayVacio.push(dat);	
				}
				mach.setDescendencia(arrayVacio)
			}
		}			
	}
	
	protected detalle(animalito:Animal){
		if (this.venta==Constantes.INDEFINIDO){
			this.navCtrl.push(Detalle,{animal:animalito});
		}
	}

	protected nuevo(sexo:number){
		var animalito:Animal;
		if (sexo==Constantes.MACHO){
			animalito=new Macho(null,null,null,null,null,null,null,null,null,null,null,null);
		}else{
			animalito=new Hembra(null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		this.navCtrl.push(Nuevo,{animal:animalito});
	}


	protected enviarResultadoAVentas(){
		var arrayAnimales: Array<Animal>=new Array<Animal>();
		for (let value in this.checkedItemsHembras){
			arrayAnimales.push(this.arrayHembras[value]);
		}
		for (let value in this.checkedItemsMachos){
			arrayAnimales.push(this.arrayMachos[value]);
		}
		this.navCtrl.push(ListadoAnimalesVendidos,{animalesSeleccionados:arrayAnimales,operacion:new Venta(null,null,null,null,null)});
	}
}
