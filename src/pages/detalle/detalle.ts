import {NavController,NavParams} from 'ionic-angular';
import { Component } from '@angular/core';
import {Hembra} from '../../servicios/beans/hembra'
import {Macho} from '../../servicios/beans/macho'
import {Animal} from '../../servicios/beans/animal'
import {ServicioDatos} from '../../servicios/serviciodatos';
//import {ListVacEnf} from '../listadoVacunasEnfermedades/listaVacunasEnfermedades'
import {ToastService} from '../../servicios/mensajeToast';
//import {AscDesc} from '../listadoAscendenciaDescendencia/listaAscendenciaDescendencia'

@Component({
	templateUrl: 'detalle.html',
})
export class Detalle {
	
	animal:Animal;

	fechaNacimiento: String;

	fechaUltimoNacimiento: String;

	arrayDescendencia:Array<Animal>;

	arrayAscendencia:Array<Animal>;

	constructor(public navCtrl: NavController,  params: NavParams,public servicio: ServicioDatos,
				private toastCtrl: ToastService) {
		this.animal=params.get("animal");
		this.arrayDescendencia=new Array<Animal>();
		this.arrayAscendencia=new Array<Animal>();
		this.fechaNacimiento="";
		this.fechaUltimoNacimiento="";
	}

	ngAfterContentInit() {
		console.log("ENTRA EN EL ionViewDidLoad");
		if (this.animal){
			let fechaFormateada=this.animal.getFechaNacimiento();
			this.fechaNacimiento= fechaFormateada ? fechaFormateada.toISOString() : '';
			if(this.animal instanceof Hembra){
				let fechaUltNacFormateada=this.animal.getFechaUltimoNacimiento();
				this.fechaUltimoNacimiento=fechaUltNacFormateada ? fechaUltNacFormateada.toISOString() : '';
			}else{
				this.fechaUltimoNacimiento="";
			}
			
			this.arrayAscendencia=this.servicio.getBusquedaAscDesc(this.animal.getAscendencia()?this.animal.getAscendencia():this.animal.ascendenciaIds);
			this.arrayDescendencia=this.servicio.getBusquedaAscDesc(this.animal.getDescendencia()?this.animal.getDescendencia():this.animal.descendenciaIds);		
			console.log("ANTES DE ASIGNAR ARRAYASCENDENCIA Y ARRAYDESCENDENCIA");
			console.log(this.arrayAscendencia);
			console.log(this.arrayDescendencia);
			this.animal.setAscendencia(this.arrayAscendencia);
			this.animal.setDescendencia(this.arrayDescendencia);
		}

	}

	protected irDetalleDesdeDetalle(animalito:Animal){
		this.navCtrl.push(Detalle,{animal:animalito});
	}

	protected devuelveColorBadge(tipoObjeto:any):String{
		return tipoObjeto instanceof Macho ? 'danger' : 'secondary'
	}

	protected volver(){
		this.navCtrl.pop();
	}

	protected modificaDatosAnimal(){
		console.log("MODIFICA DATOS ANIMAL");
		console.log(this.arrayDescendencia);
		console.log(this.arrayAscendencia);
		this.animal.setDescendencia(this.arrayDescendencia);
		this.animal.setAscendencia(this.arrayAscendencia);
		this.animal.setMetaDatoFechaMod(new Date());
		this.animal.setMetaDatoEmail(this.servicio.getExplotacion().getUsuario().getEmail());
		this.animal.setFechaNacimiento(this.fechaNacimiento ? new Date(String(this.fechaNacimiento)) :null);
		if(this.animal instanceof Hembra){
			this.animal.setFechaUltimoNacimiento(this.fechaUltimoNacimiento ? new Date(String(this.fechaUltimoNacimiento)) : null);
		}
		let correcto=this.servicio.guardaModificaAnimal(false,this.animal);

		if(correcto){
			this.toastCtrl.push("Modificación correcta","CORRECTO");
		}else{
		    this.toastCtrl.push("Error al modificar","ERROR");
		};
	}

	private modificaArrayDescendencia(datos:Array<Animal>) {
	 	this.arrayDescendencia=datos;   
	}

	private modificaArrayAscendencia(datos:Array<Animal>) {
	 	this.arrayAscendencia=datos;   
	}


	private modificaElementoEnfermedad(elemento:Array<string>){
		this.animal.setEnfermedades(elemento);
	  }
	  
	private modificaElementoVacunas(elemento:Array<string>){
	  	this.animal.setVacunas(elemento);
	  }


	isInstanceOfHembra(objeto:Animal):boolean{
		return objeto instanceof Hembra;
	}


/*	anadirElementoEnfermedad(elemento:HTMLInputElement){
		if (elemento.value!=""){
		  	if (this.animal.getEnfermedades()==null){
		  		this.animal.setEnfermedades(new Array<string>());
		  	}
		  	this.animal.getEnfermedades().push(elemento.value);
		  	elemento.value=null;
		}
	}

	anadirElementoVacunas(elemento:HTMLInputElement){
		if (elemento.value!=""){
		  	if (this.animal.getVacunas()==null){
		  		this.animal.setVacunas(new Array<string>());
		  	}
		  	this.animal.getVacunas().push(elemento.value);
		  	elemento.value=null;
		}
	}*/
	
}