import { Injectable } from '@angular/core';
import { IEFileUpload } from './beans/interfaces/fileUpload.interface';
import { ConexionGenericaService } from './conexionGenerica.service';
import { Constantes } from './genericos/constantes';
import { IEFileUploadServicio } from './interfaces/fileUpload.service.interface';

@Injectable()
export class FileUploadServicio  implements IEFileUploadServicio{

    fileUpload: IEFileUpload;

/*    constructor(@Inject('FilesConexionServicio') private conn: ConexionGenericaService<IEFileUpload>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + 'files');
    }
*/
    obtenerFile(): Promise<IEFileUpload> {
        throw new Error('Method not implemented.');
    }

    guardaFile(file: IEFileUpload): Promise<IEFileUpload> {
        throw new Error('Method not implemented.');
    }

    actualizarFile(file: IEFileUpload): Promise<IEFileUpload> {
        throw new Error('Method not implemented.');
    }

    borrarFile(file: IEFileUpload): Promise<IEFileUpload> {
        throw new Error('Method not implemented.');
    }

}

function Inject(arg0: string) {
    throw new Error('Function not implemented.');
}
