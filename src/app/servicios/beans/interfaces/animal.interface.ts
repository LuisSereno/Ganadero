import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';
import { IEEnfermedadAnimal } from './enfermedadAnimal.interface';
import { IEVacunaAnimal } from './vacunaAnimal.interface';

export interface IEAnimal extends IEMetadatos, transformJSON<IEAnimal>, IEIdentification{

	alias: string;

	raza: string;

	foto ?: string;

	numero: number;

	fechaNacimiento: Date;

	fechaMuerte: Date;

	vacunas ?: Array<IEVacunaAnimal>;

	enfermedades ?: Array<IEEnfermedadAnimal>;

	//vacunasIds ?: Array<IEVacunaAnimal>;

	//enfermedadesIds ?: Array<IEEnfermedadAnimal>;

	ascendencia?: Array<IEAnimal>;

	descendencia ?: Array<IEAnimal>;

	ascendenciaIds ?: Array<string>;

	descendenciaIds ?: Array<string>;

	precioCompra ?: number;

	precioVenta ?: number;

	fechaUltimoNacimiento ?: Date;

	fechaOperacion ?: Date;

	sexo: number;

	baja: boolean;

	peso ?: number;

}