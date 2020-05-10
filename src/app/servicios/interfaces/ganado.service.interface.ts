import { IEAnimal } from '../beans/interfaces/animal.interface';
import { IEIdentification } from '../beans/interfaces/identification.interface';

export interface IEganadoServicio {

  ganado: Array<IEAnimal>;

  obtenerDatosGanado(animal: IEAnimal): Promise<IEAnimal>;

  obtenerDatosGanadoIds(ids: Array<IEIdentification>):Promise<IEAnimal[]>;

  getBusquedaAscDesc(arrayAnimales:Array<IEAnimal>|Array<number>):Array<IEAnimal>;
  
  guardaAnimal(animal: IEAnimal): Promise<IEAnimal>;

  actualizarAnimal(animal: IEAnimal): Promise<IEAnimal>;

  encontrarAnimal(animal: IEIdentification): IEAnimal;
  
}