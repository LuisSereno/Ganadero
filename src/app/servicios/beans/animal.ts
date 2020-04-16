import { IEAnimal } from './interfaces/animal.interface';

export abstract class Animal implements IEAnimal{

	id: string;

	alias: string;

	raza: string;

	foto: string;

	numero: number;

	fechaNacimiento: Date;

	vacunas: Array<string>;

	enfermedades: Array<string>;

	ascendencia: Array<IEAnimal>;

	descendencia: Array<IEAnimal>;

	ascendenciaIds: Array<string>;

	descendenciaIds: Array<string>;

	precioCompra: number;

	precioVenta: number;

	metadatoEmail: string;

	metadatoFechaMod: Date;

	fechaUltimoNacimiento ?: Date;
	
	constructor() {
		this.id = "";
		this.alias="";
		this.raza="";
		this.foto="";
		this.numero=0
		this.fechaNacimiento = new Date();
		this.vacunas=new Array<string>();
		this.enfermedades=new Array<string>();
		this.ascendencia=new Array<IEAnimal>();
		this.descendencia=new Array<IEAnimal>();
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

	public getVacunas():Array<string>{
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