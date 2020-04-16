import { IEGeoCoordenada } from './geocoordenada.interface';

export interface IEParcela{

	id: number;

	nombre: string;

	localizacionPuntosParcela ?: Array<IEGeoCoordenada>;

}