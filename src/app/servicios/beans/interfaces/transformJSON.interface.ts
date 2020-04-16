import { IEMetadatos } from './metadatos.interface';

export interface transformJSON <K> {

    toJSON():{};

    fromJSON(json: K|string): K;

    reviver(key: string, value: any): any;

}