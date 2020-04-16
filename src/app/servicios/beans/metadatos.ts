import { IEMetadatos } from './interfaces/metadatos.interface';

export class Metadatos implements IEMetadatos{

	metadatoEmail: string;

	metadatoFechaMod: Date;

	constructor() {
		this.metadatoEmail = "";
		this.metadatoFechaMod= new Date();
	}

}