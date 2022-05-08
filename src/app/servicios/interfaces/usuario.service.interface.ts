import { IEUsuario } from '../beans/interfaces/usuario.interface';

export interface IEusuarioServicio{

    usuario: IEUsuario;

    obtenerUsuario(usuario:IEUsuario):Promise<IEUsuario>;

    guardaUsuario(usuario:IEUsuario):Promise<IEUsuario>;

    actualizarUsuario(usuario:IEUsuario):Promise<IEUsuario>;

}