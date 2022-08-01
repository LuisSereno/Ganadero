import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IEIdentification } from './beans/interfaces/identification.interface';
import { IEconexionServicio } from './interfaces/conexion.service.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ConexionGenericaService <K extends IEIdentification,> implements IEconexionServicio <K> {
  private genericObjectsCollection: AngularFireList<K>;
  protected nameCollection:string;

  constructor(private afs: AngularFireDatabase) {
  }

  public crearConexion(nameCollection:string){
    this.nameCollection=nameCollection;
    this.genericObjectsCollection = this.afs.list<K>(nameCollection);
  }

  getObjects(ids: Array<string>, filter?:string,value?:string): Observable<K[]> {
    return this.genericObjectsCollection.snapshotChanges().pipe(
      map(actions => {
         return actions.map(a => {
          if (ids===null){
            return a.payload.val();
          }else{
            if (ids.includes(a.payload.key)){
              if (filter!=null
                && a.payload.toJSON()[filter]!=null){
                  if (typeof a.payload.toJSON()[filter] == "boolean" && a.payload.toJSON()[filter]===JSON.parse(value)
                  || typeof a.payload.toJSON()[filter] == "number" && a.payload.toJSON()[filter]=== +value
                  || typeof a.payload.toJSON()[filter] == "string" && a.payload.toJSON()[filter]===value){
                    const data = a.payload.val();
                    return data;
                  }
              }else{
                const data = a.payload.val();
                return data;
              }
            }
          }
        }).filter(function(record) {
          return record !=null;
        });
      })
    );
  }

  getObject(identificador: string): Observable<K> {
    return this.afs.object(this.nameCollection.concat("/" + identificador)).valueChanges().pipe(
      map((actions) => {
        actions["id"]=identificador;
        return actions as K;
      })
    );;
  }

  addObjectWithoutID(genericObject: K): Promise<K> {
    const _this = this;
    return new Promise((resolve, reject) => {
      console.log("llama firebase WITHOUT ID" ,genericObject);
      this.genericObjectsCollection.push(genericObject).then(function(newReference){
        console.log(newReference.key);
        genericObject.id=newReference.key;
        _this.updateObject(genericObject);
        resolve(genericObject);
      }).catch(function(error) {
        console.error("Error adding document: ", error);
        reject(new Error("No guardado"));
      });
    });
  }

  addObjectWithID(genericObject: K, id:string):Promise<void>{
    const _this = this;
    return new Promise((resolve, reject) => {
      console.log("llama firebase WITH ID", id ,genericObject);
      this.genericObjectsCollection.set(id,genericObject).then(function(newReference){
        genericObject.id=id;
        _this.updateObject(genericObject);
        resolve();
      }).catch(function(error) {
        console.error("Error adding document: ", error);
        reject(new Error("No guardado"));
      });
    });
  }

  updateObject(genericObject: K): Promise<void> {
    console.log("llama firebase update WITH ID", genericObject.id ,genericObject);
    return this.genericObjectsCollection.update(genericObject.id,genericObject);
  }

  deleteObject(id: string): Promise<void> {
    return this.genericObjectsCollection.remove(id);
  }
}