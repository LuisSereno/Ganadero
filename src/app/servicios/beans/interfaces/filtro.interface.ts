import { IEMetadatos } from './metadatos.interface';

export interface IEFiltro extends IEMetadatos{


	fechaDesde ?: Date;

	fechaHasta ?: Date;

	tipoFecha ?: string;

	ordenarPor ?: string;

	bajas ?: boolean;

}