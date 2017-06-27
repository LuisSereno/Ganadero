import {Animal} from './animal';

export class Operacion {

	private id: number;

	private agrupacion: string;

	private animales: Array<Animal>;

	private precio: number;

	private fechaOperacion: Date;

	constructor() {
		this.id = 0;
		this.agrupacion="";
		this.animales=new Array<Animal>();
		this.precio=0;
		this.fechaOperacion=new Date();
	}

	public getId(): number {
		return this.id;
	}

	public setId(identificador: number) {
		this.id = identificador;
	}

	public getAgrupacion(): string {
		return this.agrupacion;
	}

	public setAgrupacion(alias:string){
		this.agrupacion = alias;
	}

	public getPrecio(): number {
		return this.precio;
	}

	public setPrecio(precio: number) {
		this.precio = precio;
	}

	public getFechaOperacion(): Date {
		
		return this.fechaOperacion;
		
	}

	public setFechaOperacion(fech: Date) {
		this.fechaOperacion = fech;
	}

	public getAnimales():Array<Animal>{
		return this.animales;
	}

	public setAnimales(arrayAnimal:Array<Animal>){
		this.animales = arrayAnimal;
	}

}