import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IEFileUpload } from './beans/interfaces/fileUpload.interface';
import { ConexionGenericaFilesService } from './conexionGenericaFiles.service';
import { Constantes } from './genericos/constantes';
import { IEFileUploadServicio } from './interfaces/fileUpload.service.interface';
import { PhotoServicio } from './photo.service';

@Injectable()
export class FileUploadServicio  implements IEFileUploadServicio{

    fileUpload: IEFileUpload;

    constructor(private conn: ConexionGenericaFilesService, private photoService:PhotoServicio) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + 'files');
    }

    obtenerFile(): Promise<IEFileUpload> {
        throw new Error('Method not implemented.');
    }

    guardaFile(file: IEFileUpload): Observable<number>{
        return this.conn.pushFileToStorage(file);
    }

    actualizarFile(file: IEFileUpload): Promise<IEFileUpload> {
        throw new Error('Method not implemented.');
    }

    borrarFile(file: IEFileUpload): Promise<void> {
        return this.conn.deleteFileStorage(file.url);
    }

}