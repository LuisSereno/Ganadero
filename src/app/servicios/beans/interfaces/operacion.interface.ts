import { IEAnimal } from './animal.interface';
import { IEIdentification } from './identification.interface';

export interface IEOperacion extends IEIdentification {

	agrupacion: string;

	animales: Array<IEAnimal>;

	precio: number;

	fechaOperacion: Date;

}