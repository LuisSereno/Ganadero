import { Injectable } from '@angular/core';
import { Constantes } from './genericos/constantes';
import { IEFiltro } from './beans/interfaces/filtro.interface';
import { IEfiltroServicio } from './interfaces/filtro.service.interface';

@Injectable()
export class FiltroServicio  implements IEfiltroServicio{

    filtro: IEFiltro;

    constructor() {
    }

    obtenerFiltro(): Promise<IEFiltro> {
        return new Promise((resolve, reject) => {
            resolve(this.filtro);
        });
    }
    guardaFiltro(filtro: IEFiltro): Promise<IEFiltro> {
        return new Promise((resolve, reject) => {
            this.filtro=filtro;
            resolve(this.filtro);
        });
    }
    actualizarFiltro(filtro: IEFiltro): Promise<IEFiltro> {
        return this.guardaFiltro(filtro);
    }

}