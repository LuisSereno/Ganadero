import { Injectable } from '@angular/core';
import { IEoperacionServicio } from './interfaces/operacion.service.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OperacionServicio  implements IEoperacionServicio{

    httpLocal: HttpClient;

    obtenerDatosOperaciones(idExplotacion: number, venta: boolean): void {
        throw new Error("Method not implemented.");
    }
    esCompra(compra: boolean): void {
        throw new Error("Method not implemented.");
    }
    anadirAnimal(anim: import("./beans/interfaces/animal.interface").IEAnimal): void {
        throw new Error("Method not implemented.");
    }
    crearOperacion(operacion: import("./beans/interfaces/operacion.interface").IEOperacion): void {
        throw new Error("Method not implemented.");
    }



}