import { IEAnimal } from '../beans/interfaces/animal.interface';
import { IEOperacion } from '../beans/interfaces/operacion.interface';
import { IEconexionServicio } from './conexion.service.interface';

export interface IEoperacionServicio{

    obtenerDatosOperaciones(idExplotacion:number,venta:boolean):void;

    esCompra(compra:boolean):void;

    anadirAnimal(anim:IEAnimal):void;

    crearOperacion(operacion:IEOperacion):void;

}