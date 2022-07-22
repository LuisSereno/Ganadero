import { IEFileUpload } from './interfaces/fileUpload.interface';
import { UserPhoto } from './interfaces/userPhoto.interface';

export class FileUpload implements IEFileUpload{

    id?: string;

    key: string;

    name: string;

    url: string;

    file: File;

    metadata ?: Map<string,string>;

    metadatoEmail?: string;

    metadatoFechaMod?: Date;

    constructor(file: File) {
      this.file = file;
    }

    toJSON(): {} {
      throw new Error('Method not implemented.');
    }
    fromJSON(json: string | IEFileUpload): IEFileUpload {
      throw new Error('Method not implemented.');
    }
    reviver(key: string, value: any) {
      throw new Error('Method not implemented.');
    }

}