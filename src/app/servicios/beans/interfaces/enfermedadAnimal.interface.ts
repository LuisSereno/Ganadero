import { IEMetadatos } from './metadatos.interface';
import { transformJSON } from './transformJSON.interface';
import { IEIdentification } from './identification.interface';
import { IEEnfermedad } from './enfermedad.interface';
import { IEVacunaAnimal } from './vacunaAnimal.interface';

export interface IEEnfermedadAnimal extends IEMetadatos, transformJSON<IEEnfermedadAnimal>, IEIdentification{

	enfermedad:IEEnfermedad;

	fecha: Date;

	vacunasUtilizadas?:Array<IEVacunaAnimal>;

}