import { IEAnimal } from './interfaces/animal.interface';
import { IEExplotacion } from './interfaces/explotacion.interface';
import { IEIdentification } from './interfaces/identification.interface';
import { IEMetadatos } from './interfaces/metadatos.interface';
import { IEOperacion } from './interfaces/operacion.interface';
import { transformJSON } from './interfaces/transformJSON.interface';

export class Operacion implements  IEMetadatos, transformJSON<IEOperacion>,IEOperacion{

	id: string;

	identificador:string;

	agrupacion: string;

	animales?: Array<IEAnimal>;

	arrayIdAnimales: Array<IEIdentification>;

	precio: number;

	fechaOperacion: Date;

	tipo: number;

	metadatoEmail?: string;

	metadatoFechaMod?: Date;

	constructor() {
		this.id = "";
		this.identificador = "";
		this.agrupacion="";
		this.animales=new Array<IEAnimal>();
		this.precio=0;
		this.fechaOperacion=new Date();
		this.tipo=null;
	}
	toJSON(): {} {
		throw new Error('Method not implemented.');
	}
	fromJSON(json: string | IEOperacion): IEOperacion {
		throw new Error('Method not implemented.');
	}
	reviver(key: string, value: any) {
		throw new Error('Method not implemented.');
	}

}