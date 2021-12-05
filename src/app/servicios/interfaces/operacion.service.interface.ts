import { IEAnimal } from '../beans/interfaces/animal.interface';
import { IEIdentification } from '../beans/interfaces/identification.interface';
import { IEOperacion } from '../beans/interfaces/operacion.interface';
import { IEconexionServicio } from './conexion.service.interface';

export interface IEoperacionServicio{

    compraExplotacion: IEOperacion[];

    ventaExplotacion: IEOperacion[];

    totalDineroCompra:number;

    totalDineroVenta:number;

    esCompra(compra:boolean);

    anadirAnimal(anim:IEAnimal, operacion:IEOperacion);

    anadirOperacion(operacion:IEOperacion);

    actualizarOperacion(operacion:IEOperacion);

    obtenerDatosOperacion(operacion: IEOperacion): Promise<IEOperacion>;

    obtenerDatosOperaciones(ids: Array<IEIdentification>):Promise<IEOperacion[]>;

    encontrarOperacion(operacion: IEIdentification): IEOperacion;

}