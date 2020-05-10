import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';

export interface IEUsuario extends IEMetadatos, transformJSON<IEUsuario>, IEIdentification {

	nombre: string;

	email: string;

	explotaciones?: Array<IEIdentification>;

}