import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';

export interface IEVacuna extends IEMetadatos, transformJSON<IEVacuna>, IEIdentification{

	nombre: string;

	descripcion?: string;

	fecha?: Date;

}