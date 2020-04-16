import { IEAnimal } from '../beans/interfaces/animal.interface';
import { IEconexionServicio } from './conexion.service.interface';

export interface IEganadoServicio {

  obtenerDatosGanado(idExplotacion:number):void;

  getBusquedaAscDesc(arrayAnimales:Array<IEAnimal>|Array<number>):Array<IEAnimal>;
  
  guardaModificaAnimal(guardado:boolean,animal:IEAnimal):Promise<IEAnimal>;

}