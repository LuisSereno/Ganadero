import { IEganadoServicio } from './interfaces/ganado.service.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GanadoServicio  implements IEganadoServicio{

    httpLocal: HttpClient;

    obtenerDatosGanado(idExplotacion: number): void {
        throw new Error("Method not implemented.");
    }
    getBusquedaAscDesc(arrayAnimales: import("./beans/interfaces/animal.interface").IEAnimal[] | number[]): import("./beans/interfaces/animal.interface").IEAnimal[] {
        throw new Error("Method not implemented.");
    }
    guardaModificaAnimal(guardado: boolean, animal: import("./beans/interfaces/animal.interface").IEAnimal): Promise<import("./beans/interfaces/animal.interface").IEAnimal> {
        throw new Error("Method not implemented.");
    }

}