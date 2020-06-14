import { IEVacuna } from '../beans/interfaces/vacuna.interface';
import { IEIdentification } from '../beans/interfaces/identification.interface';

export interface IEVacunaServicio {

  vacunas: Array<IEVacuna>;

  vacunasExplotacion: Array<IEVacuna>;

  obtenerTodasVacunas(): Promise<IEVacuna[]>

  obtenerDatosVacunas(vacuna: IEVacuna): Promise<IEVacuna>;

  obtenerDatosVacunaIds(ids: Array<IEIdentification>):Promise<IEVacuna[]>;

  getBusquedaAscDesc(arrayVacunas:Array<IEVacuna>|Array<number>):Array<IEVacuna>;

  guardaVacuna(vacuna: IEVacuna): Promise<IEVacuna>;

  actualizarVacuna(vacuna: IEVacuna): Promise<IEVacuna>;

  encontrarVacuna(vacuna: IEIdentification, soloExplotacion:boolean): IEVacuna;

}

