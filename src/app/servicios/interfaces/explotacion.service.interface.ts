import { IEExplotacion } from '../beans/interfaces/explotacion.interface';
import { IEconexionServicio } from './conexion.service.interface';
import { Observable } from 'rxjs';
import { IEIdentification } from '../beans/interfaces/identification.interface';

export interface IEexplotacionServicio{

    explotaciones: Array<IEExplotacion>;

    obtenerDatosExplotacion(explo: IEExplotacion): Promise<IEExplotacion>;

    obtenerDatosExplotacionesIds(ids:Array<IEIdentification>);

    guardaExplotacion(explo:IEExplotacion):Promise<IEExplotacion>;

    actualizarExplotacion(explo:IEExplotacion):Promise<IEExplotacion>;

}