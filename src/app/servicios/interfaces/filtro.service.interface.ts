import { IEFiltro } from '../beans/interfaces/filtro.interface';

export interface IEfiltroServicio{

    filtro: IEFiltro;

    obtenerFiltro():Promise<IEFiltro>;

    guardaFiltro(filtro:IEFiltro):Promise<IEFiltro>;

    actualizarFiltro(filtro:IEFiltro):Promise<IEFiltro>;

}