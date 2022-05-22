import { Observable } from 'rxjs';
import { IEIdentification } from '../beans/interfaces/identification.interface';

export interface IEconexionServicio <K extends IEIdentification>{

    getObjects(ids: Array<string>, filter?:string,value?:string): Observable<K[]>;

    getObject(id: string): Observable<K> ;

    addObjectWithoutID(genericObject: K): Promise<K>;

    addObjectWithID(genericObject: K, id:string): Promise<void>;

    updateObject(genericObject: K): Promise<void>;

    deleteObject(id: string): Promise<void>;
}




