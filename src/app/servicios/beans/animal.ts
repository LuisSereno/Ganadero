import { IEAnimal } from './interfaces/animal.interface';
import { IEVacunaAnimal } from './interfaces/vacunaAnimal.interface';
import { IEEnfermedadAnimal } from './interfaces/enfermedadAnimal.interface';

export abstract class Animal implements IEAnimal{

	id: string;

	alias: string;

	raza: string;

	foto: string;

	numero: number;

	fechaNacimiento: Date;

	vacunas: Array<IEVacunaAnimal>;

	enfermedades: Array<IEEnfermedadAnimal>;

	vacunasIds : Array<string>;

	enfermedadesIds : Array<string>;

	ascendencia: Array<IEAnimal>;

	descendencia: Array<IEAnimal>;

	ascendenciaIds: Array<string>;

	descendenciaIds: Array<string>;

	precioCompra: number;

	precioVenta: number;

	metadatoEmail: string;

	metadatoFechaMod: Date;

	fechaUltimoNacimiento ?: Date;

	sexo: number;

	constructor() {
		this.id = "";
		this.alias="";
		this.raza="";
		this.foto="";
		this.numero=0
		this.fechaNacimiento = new Date();
		this.vacunas=new Array<IEVacunaAnimal>();
		this.enfermedades=new Array<IEEnfermedadAnimal>();
		this.vacunasIds=new Array<string>();
		this.enfermedadesIds=new Array<string>();
		this.ascendencia=new Array<IEAnimal>();
		this.descendencia=new Array<IEAnimal>();
		this.ascendenciaIds=new Array<string>();
		this.descendenciaIds=new Array<string>();
		this.precioCompra=0;
		this.precioVenta=0;
	}


	public getId(): string {
		return this.id;
	}

	public setId(identificador: string) {
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
		return this.foto;
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

	public getVacunas():Array<IEVacunaAnimal>{
		return this.vacunas;
	}

	public setVacunas(vacunas:Array<IEVacunaAnimal>){
		this.vacunas = vacunas;
	}

	public getEnfermedades()  : Array<IEEnfermedadAnimal>{
		return this.enfermedades;
	}

	public setEnfermedades(enf:Array<IEEnfermedadAnimal>){
		this.enfermedades = enf;
	}

	public getAscendencia() : Array<IEAnimal>{
		return this.ascendencia;
	}

	public setAscendencia(ascen:Array<IEAnimal>){
		this.ascendencia = ascen;
	}

	public getDescendencia() : Array<IEAnimal>{
		return this.descendencia;
	}

	public setDescendencia(descen:Array<IEAnimal>){
		this.descendencia = descen;
	}

	public getPrecioCompra() : number{
		return Number(this.precioCompra);
	}

	public setPrecioCompra(precio:number){
		this.precioCompra = Number(precio);
	}

	public getPrecioVenta() : number{
		return Number(this.precioVenta);
	}

	public setPrecioVenta(precio:number){
		this.precioVenta = Number(precio);
	}

	toJSON(): {} {
		throw new Error("Method not implemented.");
	}
	fromJSON(json: string | IEAnimal): IEAnimal {
		throw new Error("Method not implemented.");
	}
	reviver(key: string, value: any) {
		throw new Error("Method not implemented.");
	}

}