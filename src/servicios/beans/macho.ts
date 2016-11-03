import {Animal} from './animal';

export class Macho extends Animal{


	constructor(id:number,alias:string,raza:string,foto:string,
		numero:number,fechaNacimiento:Date,vacu:Array<string>,
		enfer:Array<string>,fechaUltimoNacimiento:Date){
		super();
		this.setId(id);
		this.setAlias(alias);
		this.setRaza(raza);
		this.setFoto(foto);
		this.setNumero(numero);
		this.setFechaNacimiento(fechaNacimiento);
		this.setVacunas(vacu);
		this.setEnfermedades(enfer);
	}

}