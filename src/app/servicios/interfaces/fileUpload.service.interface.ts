import { Observable } from "rxjs/internal/Observable";
import { IEFileUpload } from "../beans/interfaces/fileUpload.interface";

export interface IEFileUploadServicio{

    fileUpload: IEFileUpload;

    obtenerFile():Promise<IEFileUpload>;

    guardaFile(file:IEFileUpload): Observable<number>;

    actualizarFile(file:IEFileUpload):Promise<IEFileUpload>;

    borrarFile(file:IEFileUpload):Promise<void>;

}