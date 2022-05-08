import { IEFileUpload } from "../beans/interfaces/fileUpload.interface";

export interface IEFileUploadServicio{

    fileUpload: IEFileUpload;

    obtenerFile():Promise<IEFileUpload>;

    guardaFile(file:IEFileUpload):Promise<IEFileUpload>;

    actualizarFile(file:IEFileUpload):Promise<IEFileUpload>;

    borrarFile(file:IEFileUpload):Promise<IEFileUpload>;

}