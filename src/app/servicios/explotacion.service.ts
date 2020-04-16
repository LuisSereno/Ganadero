import { IEexplotacionServicio } from './interfaces/explotacion.service.interface';
import { Injectable, Inject } from '@angular/core';
import { IEExplotacion } from './beans/interfaces/explotacion.interface';
import { ConexionGenericaService } from './conexionGenerica.service';
import { Constantes } from './genericos/constantes';
import { IEIdentification } from './beans/interfaces/identification.interface';
import { isDate } from 'util';

@Injectable()
export class ExplotacionServicio  implements IEexplotacionServicio{

    explotaciones: Array<IEExplotacion>;

	constructor(@Inject('ExplotacionConexionServicio') private conn: ConexionGenericaService<IEExplotacion>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + "explotaciones") ;
    }
    
    obtenerDatosExplotacion(explotacion: IEExplotacion): Promise<IEExplotacion> {
        return new Promise((resolve, reject) => {
            return this.conn.getObject(btoa(explotacion.id)).subscribe((explo:IEExplotacion) => {
                if (explo==null){
                    reject(new Error("No existe el usuario"));
                }else{
                    explotacion=explo;
                    resolve(explotacion);
                }
            }, err=>{
                console.error("Error finding user: ", err);
                reject(new Error("No existe el usuario"));   
            })
        });
    }

    obtenerDatosExplotacionesIds(ids:Array<IEIdentification>):Promise<Array<IEExplotacion>> {
        let arrayIdString:Array<string>=new Array<string>();
        if (ids!==null&& ids.length>0){
            for (let iden of ids){
                arrayIdString.push(iden.id);
            }
            return new Promise((resolve, reject) => {
                return this.conn.getObjects(arrayIdString).subscribe((explo:Array<IEExplotacion>) => {
                    if (explo==null){
                        reject(new Error("No existe el usuario"));
                    }else{
                        resolve(explo);
                    }
                }, err=>{
                    console.error("Error finding user: ", err);
                    reject(new Error("No existe el usuario"));   
                })
            });
        }
        return null;
    }

    guardaExplotacion(explo: IEExplotacion): Promise<IEExplotacion> {
        return new Promise((resolve, reject) => {
            this.conn.addObjectWithoutID(explo).then(function(docRef) {
                resolve(explo);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                reject(new Error("No guardado")); 
            });;
        });

    }

    actualizarExplotacion(explo: IEExplotacion): Promise<IEExplotacion> {
        return new Promise((resolve, reject) => {
            this.conn.updateObject(explo).then(function(docRef) {
                console.log("Document update", docRef);
                resolve(explo);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                reject(new Error("No actualizado")); 
            });;
        });
    }

}