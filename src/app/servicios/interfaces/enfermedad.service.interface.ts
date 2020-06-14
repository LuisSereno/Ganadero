import { IEEnfermedad } from '../beans/interfaces/enfermedad.interface';
import { IEIdentification } from '../beans/interfaces/identification.interface';

export interface IEEnfermedadServicio {

  enfermedades: Array<IEEnfermedad>;

  enfermedadesExplotacion: IEEnfermedad[];

  obtenerTodasEnfermedades(): Promise<IEEnfermedad[]>;

  obtenerDatosEnfermedades(enfermedad: IEEnfermedad): Promise<IEEnfermedad>;

  obtenerDatosEnfermedadIds(ids: Array<IEIdentification>):Promise<IEEnfermedad[]>;

  getBusquedaAscDesc(arrayEnfermedades:Array<IEEnfermedad>|Array<number>):Array<IEEnfermedad>;

  guardaEnfermedad(enfermedad: IEEnfermedad): Promise<IEEnfermedad>;

  actualizarEnfermedad(enfermedad: IEEnfermedad): Promise<IEEnfermedad>;

  encontrarEnfermedad(enfermedad: IEIdentification, soloExplotacion:boolean): IEEnfermedad;

}

