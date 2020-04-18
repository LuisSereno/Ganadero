import { GanadoServicio } from './../../servicios/ganado.service';
import { IEExplotacion } from './../../servicios/beans/interfaces/explotacion.interface';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { Component, Input } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Venta} from '../../servicios/beans/venta'
import {Detalle} from '../detalle/detalle'
import {ListadoAnimalesVendidos} from '../listadoVentas/listaAnimalesVendidos/listadoAnimalesVendidos'
import {Nuevo} from '../nuevo/nuevo'
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Constantes} from '../../servicios/genericos/constantes';
import { ActivatedRoute, Router } from '@angular/router';
import { Explotacion } from 'src/app/servicios/beans/explotacion';

@Component({
  templateUrl: 'listado.html'
})
export class ListaGanado {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero

	explotacion:IEExplotacion;

	tipoMostrado: string = "hembras";

	arrayHembras: Array<IEAnimal>;

	arrayMachos: Array<IEAnimal>;

	checkedItemsHembras:boolean[];

	checkedItemsMachos:boolean[];

	venta:number;

  	constructor(public navCtrl: Router,protected params: ActivatedRoute,public ganadoServicio: GanadoServicio) {

	}
	ngOnInit(){
		this.explotacion=new Explotacion();
	}

	ionViewWillEnter (){
		this.explotacion=JSON.parse(this.params.snapshot.queryParams.explotacion);
		/*
		if (this.venta==Constantes.COMPRA || this.venta==Constantes.VENTA){
				let animalesTotales:Array<Animal>=JSON.parse(this.params.snapshot.paramMap.get("animales"));
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
				this.arrayMachos=this.servicio.getExplotacion().arrayMachos;
				this.arrayHembras=this.servicio.getExplotacion().arrayHembras;
				this.checkedItemsHembras= new Array(this.arrayHembras.length);
				this.checkedItemsMachos= new Array(this.arrayMachos.length);
			}else{
				this.venta=Constantes.INDEFINIDO;
				this.arrayMachos=this.servicio.getExplotacion().arrayMachos;
				this.arrayHembras=this.servicio.getExplotacion().arrayHembras;

				if (this.arrayMachos.length==0 && this.arrayHembras.length==0){
					this.llamadaServicio();
				}


			}

			*/

	}

   ionViewDidLoad() {

	/*
    	console.log("Se inicializala la pagina ionViewDidLoad cuando cambias en el menu");

    	this.arrayHembras= new Array<Hembra>();
		this.arrayMachos= new Array<Macho>();
		this.venta=JSON.parse(this.params.snapshot.paramMap.get("venta"));
		if (this.venta!=Constantes.COMPRA && this.venta!=Constantes.VENTA && this.venta!=Constantes.VENTA_VENDER){
			this.venta=Constantes.INDEFINIDO;
		}
*/
	}

	private transformIdAnimal(){
		var animalCompleto=null;
		for (let hem of this.arrayHembras){
			let arrayVacio:Array<IEAnimal>=new Array<Animal>();
			if (hem.ascendencia!=null){
				for (let dat of hem.ascendencia){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.id === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}

					arrayVacio.push(dat);

				}
				hem.ascendencia = arrayVacio;
			}
			if (hem.descendencia!=null){
				for (let dat of hem.descendencia){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.id === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}
					arrayVacio.push(dat);
				}
				hem.descendencia = arrayVacio;
			}
		}
		for (let mach of this.arrayMachos){
			let arrayVacio:Array<IEAnimal>=new Array<Animal>();
			if (mach.ascendencia!=null){
				for (let dat of mach.ascendencia){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.id === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}	
					arrayVacio.push(dat);
				}
				mach.ascendencia =  arrayVacio;
			}
			if (mach.descendencia!=null){
				for (let dat of mach.descendencia){
					animalCompleto = this.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.arrayMachos.find(hemb =>
						         +hemb.id === +dat
						         );		
						if (animalCompleto){
							dat=animalCompleto;	
						}else{
							dat=null;
						}			
					}	
					arrayVacio.push(dat);	
				}
				mach.descendencia = arrayVacio;
			}
		}			
	}
	
	protected detalle(animalito:Animal){
		if (this.venta==Constantes.INDEFINIDO){
			this.navCtrl.navigate(['ganadero/animal-detalle',{animal:animalito}]);
		}
	}

	protected nuevo(sexo:number){
		var animalito:Animal;
		if (sexo==Constantes.MACHO){
			animalito=new Macho(null,null,null,null,null,null,null,null,null,null,null,null);
		}else{
			animalito=new Hembra(null,null,null,null,null,null,null,null,null,null,null,null,null);
		}
		this.navCtrl.navigate(['ganadero/animal-nuevo'],{queryParams:{"animal":JSON.stringify(animalito)}}); 
	}


	protected enviarResultadoAVentas(){
		var arrayAnimales: Array<IEAnimal>=new Array<Animal>();
		for (let value in this.checkedItemsHembras){
			arrayAnimales.push(this.arrayHembras[value]);
		}
		for (let value in this.checkedItemsMachos){
			arrayAnimales.push(this.arrayMachos[value]);
		}
		this.navCtrl.navigate(['ganadero/listado-animales-vendidos',{animalesSeleccionados:arrayAnimales,operacion:new Venta(null,null,null,null,null)}]);
	}

	private llamadaServicio(){
		/*
		this.servicio.obtenerDatosGanado(this.servicio.getExplotacion().id).subscribe((data:any) => {
			this.arrayHembras= new Array<Hembra>();
			this.arrayMachos= new Array<Macho>();

			if (data.arrayMachos!=undefined){
				for (let mach of data.arrayMachos){
					let machito:Macho=Macho.fromJSON(mach);
					this.arrayMachos.push(machito);
				}					
			}
			if (data.arrayHembras!=undefined){
				for (let hem of data.arrayHembras){
					let hembrita:Hembra=Hembra.fromJSON(hem);
					this.arrayHembras.push(hembrita);
				}
			}
			this.transformIdAnimal();
			this.servicio.getExplotacion().arrayHembras = this.arrayHembras;
			this.servicio.getExplotacion().arrayMachos = this.arrayMachos;
		},err => {
		    console.log("Errr al obtener los datos del ganado!");
		    console.log(err);
		});
*/
	}
	

	volver(){
		console.log("VUELVE");
	}
}
