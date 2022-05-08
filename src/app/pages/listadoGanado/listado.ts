import { ExplotacionServicio } from './../../servicios/explotacion.service';
import { IEIdentification } from './../../servicios/beans/interfaces/identification.interface';
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
import { OperacionServicio } from 'src/app/servicios/operacion.service';
import { Location } from '@angular/common';
import { Filtro } from 'src/app/servicios/beans/filtro';
import { FiltroAvanzado } from '../filtroAvanzado/filtroAvanzado';
import { PopoverController } from '@ionic/angular';
import { FiltroAvanzadoComponentPage } from '../filtro-avanzado-component/filtro-avanzado-component.page';
import { FiltroServicio } from 'src/app/servicios/filtro.service';

@Component({
  templateUrl: 'listado.html'
})
export class ListaGanado {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero

	explotacion:Explotacion;

	tipoMostrado: string = "hembras";

	checkedItemsHembras:string[];

	checkedItemsMachos:string[];

	venta:number;

	filtroAvanzado:Filtro;

	arrayMachosTemp = new Array<IEAnimal>();

	arrayHembrasTemp = new Array<IEAnimal>();

	mostrandoBajas:boolean=false;

	public filterTerm: string = "";

	  constructor(public router: Router,protected params: ActivatedRoute,public ganadoServicio: GanadoServicio,
		public explotacionServ: ExplotacionServicio, private location: Location,
		protected operacionServicio: OperacionServicio,private popover:PopoverController, private filtroServicio:FiltroServicio) {

	}
	ngOnInit(){
		//this.venta=Constantes.INDEFINIDO;
		this.venta=this.params.snapshot.queryParams.venta;
		if (this.venta==null){
			this.venta=Constantes.INDEFINIDO;
		}else{
			this.checkedItemsHembras = new Array<string>();
			this.checkedItemsMachos = new Array<string>();
		}
		if(this.explotacionServ.explotacionSeleccionada){
			this.explotacion=this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada);
		}else{
			this.explotacion = new Explotacion();
		}
	}

	ionViewWillEnter (){
		this.explotacion=this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada);
		this.filtroServicio.obtenerFiltro().then(filtro=>{
			if (filtro==null){
				this.getDatosGanado("baja", "false");
			}else{
				this.filtroAvanzado=filtro;
				this.filterItems();
			}
		}).catch(error=>{
			console.error(error);
			this.getDatosGanado("baja", "false");
		});

		if (this.venta==Constantes.VENTA){

			if (this.operacionServicio.operacionSeleccionada.animales != null){
				let arrayMachosAux=new Array<IEAnimal>();
				let arrayHembrasAux=new Array<IEAnimal>();
				arrayMachosAux = this.operacionServicio.operacionSeleccionada.animales.filter(anim => anim instanceof Macho);
				arrayHembrasAux = this.operacionServicio.operacionSeleccionada.animales.filter(anim => anim instanceof Hembra);
				this.explotacion.arrayMachos.forEach(anim=>{
					let animFilter=arrayMachosAux.find(animAux => animAux.id==anim.id);
					if (animFilter){
						this.checkedItemsMachos[animFilter.id]=true;
					}
				});
				this.explotacion.arrayHembras.forEach(anim=>{
					let animFilter=arrayHembrasAux.find(animAux => animAux.id==anim.id);
					if (animFilter){
						this.checkedItemsHembras[animFilter.id]=true;
					}
				});
			  }
		}

	}

	private getDatosGanado(tipoCampoFiltro: string, valorCampoFiltro: string):Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.ganadoServicio.obtenerDatosGanadoIds(this.explotacion.arrayIdAnimales, tipoCampoFiltro, valorCampoFiltro)
				.then((data: IEAnimal[]) => {
					this.explotacion.arrayMachos = new Array<IEAnimal>();
					this.explotacion.arrayHembras = new Array<IEAnimal>();
					for (let animal of data) {
						if (animal) {
							if (animal.sexo == Constantes.MACHO) {
								let macho: Macho;
								if (this.venta == Constantes.VENTA &&
									this.operacionServicio.operacionSeleccionada.animales != null &&
									this.operacionServicio.operacionSeleccionada.animales.find(anim => anim.id == animal.id) != null) {
									//anadimos los datos de precios de la venta
									macho = Macho.fromJSON(this.operacionServicio.operacionSeleccionada.animales.find(anim => anim.id == animal.id));
								} else {
									macho = Macho.fromJSON(animal);
								}
								this.explotacion.arrayMachos.push(macho);
							} else {
								let hembra: Hembra;
								if (this.venta == Constantes.VENTA &&
									this.operacionServicio.operacionSeleccionada.animales != null &&
									this.operacionServicio.operacionSeleccionada.animales.find(anim => anim.id == animal.id) != null) {
									//anadimos los datos de precios de la venta
									hembra = Hembra.fromJSON(this.operacionServicio.operacionSeleccionada.animales.find(anim => anim.id == animal.id));
								} else {
									hembra = Hembra.fromJSON(animal);
								}
								this.explotacion.arrayHembras.push(hembra);
							}
						}
					}
					this.ganadoServicio.ganado = data;
					this.arrayHembrasTemp = Array.from(this.explotacion.arrayHembras);
					this.arrayMachosTemp = Array.from(this.explotacion.arrayMachos);
					resolve(true);
				})
				.catch(e => {console.error("Animales no encontrados", e);reject("Animales no encontrados")});
		});
	}

   ionViewDidLoad() {


	}

	protected getFotoAnimal(anim:Animal) {
		if (anim.foto) {
			return anim.foto;
		} else {
			if (anim instanceof Macho) {
				return "assets/img/toro.png";
			} else {
				return "assets/img/vaca.png";
			}
		}
	}


	/*private transformIdAnimal(){
		var animalCompleto=null;
		for (let hem of this.explotacion.arrayHembras){
			let arrayVacio:Array<IEAnimal>=new Array<Animal>();
			if (hem.ascendencia!=null){
				for (let dat of hem.ascendencia){
					animalCompleto = this.explotacion.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.explotacion.arrayMachos.find(hemb =>
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
					animalCompleto = this.explotacion.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.explotacion.arrayMachos.find(hemb =>
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
		for (let mach of this.explotacion.arrayMachos){
			let arrayVacio:Array<IEAnimal>=new Array<Animal>();
			if (mach.ascendencia!=null){
				for (let dat of mach.ascendencia){
					animalCompleto = this.explotacion.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.explotacion.arrayMachos.find(hemb =>
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
					animalCompleto = this.explotacion.arrayHembras.find(hemb =>
					         +hemb.id === +dat
					         );
					if (animalCompleto){
						dat=animalCompleto;
					}else{
						animalCompleto = this.explotacion.arrayMachos.find(hemb =>
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
*/
	protected detalle(animalito:Animal){
		if (this.venta==Constantes.INDEFINIDO){
			this.router.navigate(['ganadero/animal-detalle',animalito.id]);
		}
	}

	protected nuevo(sexo:number){

		this.router.navigate(['ganadero/animal-nuevo'],{queryParams:{"explotacionID":this.explotacion.id,
																	  "animalID":null,
																	  "sexo":sexo,}});
	}


	protected enviarResultadoAVentas(){
		if (this.operacionServicio.operacionSeleccionada.animales==null){
			this.operacionServicio.operacionSeleccionada.animales =  new Array<IEAnimal>();
		}
		for (let value in this.checkedItemsHembras){
			if (this.checkedItemsHembras[value] &&
				this.operacionServicio.operacionSeleccionada.animales.find(anim => anim.id==this.explotacion.arrayHembras.find(x => x.id === value).id)==null){
				let animFiltered=this.explotacion.arrayHembras.find(x => x.id === value);
				if (animFiltered){
					this.operacionServicio.operacionSeleccionada.animales.push(animFiltered);
					this.operacionServicio.operacionSeleccionada.precio+=animFiltered.precioVenta;
					this.operacionServicio.operacionSeleccionada.peso+=animFiltered.peso;
				}
			}
		}
		for (let value in this.checkedItemsMachos){
			if (this.checkedItemsMachos[value]&&
				this.operacionServicio.operacionSeleccionada.animales.find(anim => anim.id==this.explotacion.arrayMachos.find(x => x.id === value).id)==null){
					let animFiltered=this.explotacion.arrayMachos.find(x => x.id === value);
					if (animFiltered){
						this.operacionServicio.operacionSeleccionada.animales.push(animFiltered);
						this.operacionServicio.operacionSeleccionada.precio+=animFiltered.precioVenta;
						this.operacionServicio.operacionSeleccionada.peso+=animFiltered.peso;
					}
			}
		}
		//this.router.navigate(['ganadero/listado-animales-vendidos',{animalesSeleccionados:arrayAnimales,operacion:new Venta(null,null,null,null,null)}]);
		this.location.back();
	}

	protected anadeAnimal(anim:IEAnimal){
		if (anim instanceof Macho) {
			if (!this.explotacion.arrayMachos){
				this.explotacion.arrayMachos= new Array<IEAnimal>();
			}
			this.explotacion.arrayMachos.push(anim);
		} else {
			if (!this.explotacion.arrayHembras){
				this.explotacion.arrayHembras= new Array<IEAnimal>();
			}
			this.explotacion.arrayHembras.push(anim);
		}
		if (!this.explotacion.arrayIdAnimales) {
			this.explotacion.arrayIdAnimales= new Array<IEIdentification>();
		}
		this.explotacion.arrayIdAnimales.push({ id: anim.id });
		this.explotacionServ.actualizarExplotacion(Explotacion.fromJSON(this.explotacion)).then((explo:IEExplotacion)=>{
			console.log("El animal ha sido sincronizado con la explotacion");
		}).catch(err=>console.error("El animal no ha sido sincronizado con la explotacion",err));
	}

	volver(){
		for (let value in this.checkedItemsHembras){
			this.checkedItemsHembras[value]=null;
		}
		for (let value in this.checkedItemsMachos){
			this.checkedItemsMachos[value]=null;
		}
		this.location.back();
	}

	CreatePopover()
	{
	  const popover = this.popover.create({component:FiltroAvanzadoComponentPage,
		componentProps: {filtroAvanzadoEntrada: this.filtroAvanzado},
	  showBackdrop:true,translucent: false}).then((popoverElement)=>{
		popoverElement.present();
		popoverElement.onDidDismiss().then(
			(data: any) => {
			  if (data) {
				  this.filtroAvanzado=data.data.data;
				  this.filtroServicio.guardaFiltro(this.filtroAvanzado);
				  this.filterItems();
			  }
			});
	  });

	}

	filterItems() {
		if (this.filtroAvanzado.bajas){
			if (!this.mostrandoBajas){
				this.getDatosGanado(null, null).then(valor=>valor?this.filterItemsHembrasMachos():null);
			}else{
				this.filterItemsHembrasMachos();
			}
			this.mostrandoBajas=true;
		}else{
			if (this.mostrandoBajas){
				this.getDatosGanado("baja", "false").then(valor=>valor?this.filterItemsHembrasMachos():null);
			}else{
				this.filterItemsHembrasMachos();
			}
			this.mostrandoBajas=false;
		}
	}

	private filterItemsHembrasMachos() {
		this.arrayHembrasTemp = Array.from(this.explotacion.arrayHembras);
		this.arrayMachosTemp = Array.from(this.explotacion.arrayMachos);
		let value = this.filterTerm;
		this.filterItemsHembras();
		this.filterItemsMachos();
	}

	private filterItemsMachos() {
		let arrayAux:Array<IEAnimal>=new Array<Animal>();
		arrayAux = this.arrayMachosTemp.filter(item => {
			return this.filtrarFecha(item);
		});
		this.arrayMachosTemp = this.filtrarOrden(arrayAux);
	}

	private filterItemsHembras() {
		let arrayAux:Array<IEAnimal>=new Array<Animal>();
		arrayAux = this.arrayHembrasTemp.filter(item => {
			return this.filtrarFecha(item);
		});
		this.arrayHembrasTemp = this.filtrarOrden(arrayAux);
	}

	onSearchInput(){
		console.log("hola");
    }

	private filtrarFecha(item:IEAnimal):IEAnimal{
		let fechaDesde=this.filtroAvanzado.fechaDesde ? new Date(String(this.filtroAvanzado.fechaDesde)) : null
		let fechaHasta=this.filtroAvanzado.fechaHasta ? new Date(String(this.filtroAvanzado.fechaHasta)) : null
		if (fechaDesde!=null && fechaHasta!=null){
			switch(this.filtroAvanzado.tipoFecha) {
				case "nacimiento": {
					if (item.fechaNacimiento!=null && item.fechaNacimiento >= fechaDesde
						&& item.fechaNacimiento <= fechaHasta) return item;
				break;
				}
				case "paricion": {
					if (item.fechaUltimoNacimiento!=null && item.fechaUltimoNacimiento >= fechaDesde
						&& item.fechaNacimiento <= fechaHasta) return item;
					break;
				}
				case "compra": {
					//me tengo que traer las operaciones y mirar las de compras
					if (item.precioCompra>0 && item.fechaOperacion >= fechaDesde
						&& item.fechaOperacion <= fechaHasta) return item;
					break;
				}
				case "venta": {
					//me tengo que traer las operaciones y mirar las de ventas
					if (item.precioCompra>0 && item.fechaOperacion >= fechaDesde
						&& item.fechaOperacion <= fechaHasta) return item;
					break;
				}
				case "baja": {
					if (item.fechaMuerte >= fechaDesde
						&& item.fechaMuerte <= fechaHasta) return item;
					break;
				}
				default: {
					return item;
				}
			}
		}else{
			return item;
		}

	}

	private filtrarOrden(arrayAux:Array<IEAnimal>):Array<IEAnimal>{
		if (this.filtroAvanzado.ordenarAsc){
			return this.filtrarOrdenAsc(arrayAux);
		}else{
			return this.filtrarOrdenDesc(arrayAux);
		}
	}


	private filtrarOrdenAsc(arrayAux: IEAnimal[]):Array<IEAnimal> {
		switch (this.filtroAvanzado.ordenarPor) {
			case "paricion": {
				arrayAux.sort((a, b) => (a.fechaUltimoNacimiento > b.fechaUltimoNacimiento) ? 1 : ((b.fechaUltimoNacimiento > a.fechaUltimoNacimiento) ? -1 : 0));
				break;
			}
			case "edad": {
				arrayAux.sort((a, b) => (a.fechaNacimiento > b.fechaNacimiento) ? 1 : ((b.fechaNacimiento > a.fechaNacimiento) ? -1 : 0));
				break;
			}
			case "numero": {
				arrayAux.sort((a, b) => (a.numero > b.numero) ? 1 : ((b.numero > a.numero) ? -1 : 0));
				break;
			}
			case "venta": {
				arrayAux.sort((a, b) => (a.precioVenta > b.precioVenta) ? 1 : ((b.precioVenta > a.precioVenta) ? -1 : 0));
				break;
			}
			case "compra": {
				arrayAux.sort((a, b) => (a.precioCompra > b.precioCompra) ? 1 : ((b.precioCompra > a.precioCompra) ? -1 : 0));
				break;
			}
			case "peso": {
				arrayAux.sort((a, b) => (a.peso > b.peso) ? 1 : ((b.peso > a.peso) ? -1 : 0));
				break;
			}
			default: {
				break;
			}
		}
		return arrayAux;
	}

	private filtrarOrdenDesc(arrayAux: IEAnimal[]):Array<IEAnimal> {
		switch (this.filtroAvanzado.ordenarPor) {
			case "paricion": {
				arrayAux.sort((a, b) => (a.fechaUltimoNacimiento==null || a.fechaUltimoNacimiento < b.fechaUltimoNacimiento) ? 1 : ((a.fechaUltimoNacimiento==null || b.fechaUltimoNacimiento < a.fechaUltimoNacimiento) ? -1 : 0));
				break;
			}
			case "edad": {
				arrayAux.sort((a, b) => (a.fechaNacimiento==null || a.fechaNacimiento < b.fechaNacimiento) ? 1 : ((b.fechaNacimiento==null || b.fechaNacimiento < a.fechaNacimiento) ? -1 : 0));
				break;
			}
			case "numero": {
				arrayAux.sort((a, b) => (a.numero==null || a.numero < b.numero) ? 1 : ((b.numero==null ||b.numero < a.numero) ? -1 : 0));
				break;
			}
			case "venta": {
				arrayAux.sort((a, b) => (a.precioVenta==null || (a.precioVenta < b.precioVenta)) ? 1 : ((b.precioVenta==null|| b.precioVenta < a.precioVenta) ? -1 : 0));
				break;
			}
			case "compra": {
				arrayAux.sort((a, b) => (a.precioCompra==null || (a.precioCompra < b.precioCompra)) ? 1 : ((b.precioCompra==null|| b.precioCompra < a.precioCompra) ? -1 : 0));
				break;
			}
			case "peso": {
				arrayAux.sort((a, b) => (a.peso==null || (a.peso < b.peso)) ? 1 : ((b.peso==null || (b.peso < a.peso)) ? -1 : 0));
				break;
			}
			default: {
				break;
			}
		}
		return arrayAux;
	}
}
