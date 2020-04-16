import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';

export interface IEDocumento extends IEMetadatos, transformJSON<IEDocumento>, IEIdentification{

	nombre: string;

	urlMovil: string;

	tipo: string;

}