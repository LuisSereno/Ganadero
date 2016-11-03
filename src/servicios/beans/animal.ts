import {Constantes} from '../constantes';

export abstract class Animal {

	private id: number;

	private alias: string;

	private raza: string;

	private foto: string;

	private numero: number;

	private fechaNacimiento: Date;

	private vacunas: Array<string>;

	private enfermedades: Array<string>;


	constructor() {
		this.id = 0;
		this.alias="";
		this.raza="";
		this.foto="";
		this.numero=0
		this.fechaNacimiento = new Date();
		this.vacunas=new Array<string>();
		this.enfermedades=new Array<string>();
	}

	public getId(): number {
		return this.id;
	}

	public setId(identificador: number) {
		this.id = identificador;
	}

	public getAlias(): string {
		return this.alias;
	}

	public setAlias(alias:string){
		this.alias = alias;
	}

	public getRaza()  : string{
		return this.raza;
	}

	public setRaza(raza:string){
		this.raza = raza;
	}

	public getFoto()  : string{
		if (this.foto!=null){
			return this.foto;			
		}else{
			return Constantes.FOTO_ANIMAL_DEFECTO;
		}
	}

	public setFoto(foto:string){
		if (foto!=null && foto.trim()!=""){
			this.foto = foto;
		}else{
			this.foto = null;
		}
	}

	public getNumero()  : number{
		return this.numero;
	}

	public setNumero(num:number){
		this.numero = num;
	}

	public getFechaNacimiento() : Date{
		return this.fechaNacimiento;
	}

	public setFechaNacimiento(fecNac:Date){
		this.fechaNacimiento = fecNac;
	}

	public getVacunas()  : Array<string>{
		return this.vacunas;
	}

	public setVacunas(vacunas:Array<string>){
		this.vacunas = vacunas;
	}

	public getEnfermedades()  : Array<string>{
		return this.enfermedades;
	}

	public setEnfermedades(enf:Array<string>){
		this.enfermedades = enf;
	}

/*	public abstract ataquePrimario();

	public abstract ataqueSecundario();

	public abstract defensaNormal();

	public abstract defensaConversion();
	*/
}