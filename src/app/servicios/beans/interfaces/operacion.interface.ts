import { IEAnimal } from './animal.interface';
import { IEIdentification } from './identification.interface';

export interface IEOperacion extends IEIdentification {

	identificador:string;

	agrupacion: string;

	arrayIdAnimales: Array<IEIdentification>;

	precio: number;

	fechaOperacion: Date;

	tipo: number;

}