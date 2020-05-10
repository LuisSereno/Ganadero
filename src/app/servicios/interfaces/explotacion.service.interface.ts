import { IEExplotacion } from '../beans/interfaces/explotacion.interface';
import { IEIdentification } from '../beans/interfaces/identification.interface';

export interface IEexplotacionServicio{

    explotaciones: Array<IEExplotacion>;

    obtenerDatosExplotacion(explo: IEExplotacion): Promise<IEExplotacion>;

    obtenerDatosExplotacionesIds(ids:Array<IEIdentification>);

    guardaExplotacion(explo:IEExplotacion):Promise<IEExplotacion>;

    actualizarExplotacion(explo:IEExplotacion):Promise<IEExplotacion>;

    encontrarExplotacion(explo:IEIdentification):IEExplotacion;
    
}