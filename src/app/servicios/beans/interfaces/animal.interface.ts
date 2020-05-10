import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';

export interface IEAnimal extends IEMetadatos, transformJSON<IEAnimal>, IEIdentification{

	alias: string;

	raza: string;

	foto ?: string;

	numero: number;

	fechaNacimiento: Date;

	vacunas ?: Array<string>;

	enfermedades ?: Array<string>;

	ascendencia?: Array<IEAnimal>;

	descendencia ?: Array<IEAnimal>;

	ascendenciaIds ?: Array<string>;

	descendenciaIds ?: Array<string>;

	precioCompra ?: number;

	precioVenta ?: number;

	fechaUltimoNacimiento ?: Date;

	sexo: number;

}