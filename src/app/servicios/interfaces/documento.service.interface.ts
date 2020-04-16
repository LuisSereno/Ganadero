import { IEDocumento } from '../beans/interfaces/documento.interface';
import { IEExplotacion } from '../beans/interfaces/explotacion.interface';
import { IEconexionServicio } from './conexion.service.interface';

export interface IEDocumentoServicio {

  documento:IEDocumento;

  listarDocumentos(idExplotacion:number);
  
  guardaDocumento(explotacion:IEExplotacion):Promise<IEDocumento>;

  obtenerURLSubida(email:string):string;

  obtenerURLBajada(email:string):Promise<string>;

  createAuthorizationHeader(headers: Headers|{}, accessToken:string ):void;

}

