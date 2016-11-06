import {Animal} from './animal';

export class Hembra extends Animal{

	private fechaUltimoNacimiento : Date;

	constructor(id:number,alias:string,raza:string,foto:string,
		numero:number,fechaNacimiento:Date,vacu:Array<string>,
		enfer:Array<string>,fechaUltimoNacimiento:Date,
		ascen:Array<Animal>,descen:Array<Animal>){
		super();
		this.setId(id);
		this.setAlias(alias);
		this.setRaza(raza);
		this.setFoto(foto);
		this.setNumero(numero);
		this.setFechaNacimiento(fechaNacimiento);
		this.setVacunas(vacu);
		this.setEnfermedades(enfer);
		this.setFechaUltimoNacimiento(fechaUltimoNacimiento);
		this.setAscendencia(ascen);
		this.setDescendencia(descen);
	}

	public setFechaUltimoNacimiento(fecUlti:Date){
		this.fechaUltimoNacimiento = fecUlti;
	}

	public getFechaUltimoNacimiento()  : Date{
		return this.fechaUltimoNacimiento;
	}

}