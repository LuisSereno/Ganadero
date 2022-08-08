import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEDocumento } from './documento.interface';
import { IEOperacion } from './operacion.interface';
import { IEAnimal } from './animal.interface';
import { IEUsuario } from './usuario.interface';
import { IEParcela } from './parcela.interface';
import { IEIdentification } from './identification.interface';

export interface IEExplotacion extends IEMetadatos, transformJSON<IEExplotacion>, IEIdentification{

	nombre: string;

	usuarios: Array<IEIdentification>;

	fechaAlta: Date;

	dineroTotal ?: number;

	dineroAnual ?: number;

	foto ?: Array<string>;

	arrayIdAnimales ?: Array<IEIdentification>;

	arrayIdOperaciones ?: Array<IEIdentification>;

	arrayIdDocumentos ?: Array<IEIdentification>;

	arrayIdParcelas ?: Array<IEIdentification>;

	arrayIdVacunas ?: Array<IEIdentification>;

	arrayIdEnfermedades ?: Array<IEIdentification>;

}