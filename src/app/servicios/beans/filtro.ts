import { IEFiltro } from './interfaces/filtro.interface';

export class Filtro implements IEFiltro{


	fechaDesde ?: Date;

	fechaHasta ?: Date;

	tipoFecha ?: string;

	ordenarPor ?: string;

    ordenarAsc ?: boolean;

	bajas ?: boolean;

    constructor() {

        this.fechaDesde=null;
        this.fechaHasta=null;
        this.tipoFecha="";
        this.ordenarPor="numero";
        this.bajas=false;
        this.ordenarAsc=false;

    }

}