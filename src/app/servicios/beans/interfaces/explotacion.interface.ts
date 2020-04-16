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

	arrayMachos ?: Array<IEAnimal>;

	arrayHembras ?: Array<IEAnimal>;

	arrayCompras ?: Array<IEOperacion>;

	arrayVentas ?: Array<IEOperacion>;

	arrayDocumentos ?: Array<IEDocumento>;

    arrayParcelas ?: Array<IEParcela>;

}