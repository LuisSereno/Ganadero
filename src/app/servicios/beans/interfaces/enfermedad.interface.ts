import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';
import { IEVacuna } from './vacuna.interface';

export interface IEEnfermedad extends IEMetadatos, transformJSON<IEEnfermedad>, IEIdentification{

	nombre: string;

	descripcion?: string;

	fecha?: Date;

	vacunasUtilizadas?:Array<IEVacuna>;

}