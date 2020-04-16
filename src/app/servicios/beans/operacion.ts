import { IEAnimal } from './interfaces/animal.interface';
import { IEOperacion } from './interfaces/operacion.interface';

export class Operacion implements IEOperacion{
	
	id: string;

	agrupacion: string;

	animales: Array<IEAnimal>;

	precio: number;

	fechaOperacion: Date;

	constructor() {
		this.id = "";
		this.agrupacion="";
		this.animales=new Array<IEAnimal>();
		this.precio=0;
		this.fechaOperacion=new Date();
	}

}