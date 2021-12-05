import { IEVacuna } from '../beans/interfaces/vacuna.interface';
import { IEIdentification } from '../beans/interfaces/identification.interface';
import { Compra } from '../beans/compra';
import { Venta } from '../beans/venta';
import { IEAnimal } from '../beans/interfaces/animal.interface';
import { IEOperacion } from '../beans/interfaces/operacion.interface';

export interface IECompraVentaServicio {

  compraExplotacion: Compra[];

  ventaExplotacion: Venta[];

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

