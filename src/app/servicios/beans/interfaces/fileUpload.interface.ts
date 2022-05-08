import { IEIdentification } from './identification.interface';
import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';

export interface IEFileUpload extends IEMetadatos, transformJSON<IEFileUpload>, IEIdentification{


	key: string;

	name: string;

	url: string;

	file: File;

	metadata ?: Map<string,string>;

}