import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';
import { IEVacuna } from './vacuna.interface';

export interface IEVacunaAnimal extends IEMetadatos, transformJSON<IEVacunaAnimal>, IEIdentification{

	vacuna:IEVacuna;

	fecha: Date;

}