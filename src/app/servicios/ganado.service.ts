import { IEganadoServicio } from './interfaces/ganado.service.interface';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEAnimal } from './beans/interfaces/animal.interface';
import { Constantes } from './genericos/constantes';
import { ConexionGenericaService } from './conexionGenerica.service';
import { IEIdentification } from './beans/interfaces/identification.interface';

@Injectable()
export class GanadoServicio implements IEganadoServicio {

    ganado: Array<IEAnimal>;

    constructor(@Inject('GanadoConexionServicio') private conn: ConexionGenericaService<IEAnimal>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + 'ganado');
        this.ganado=new Array<IEAnimal>();
    }

    obtenerDatosGanado(animal: IEAnimal): Promise<IEAnimal> {
        return new Promise((resolve, reject) => {
            return this.conn.getObject(btoa(animal.id)).subscribe((anim: IEAnimal) => {
                if (anim == null) {
                    reject(new Error('No existe el animal'));
                } else {
                    animal = anim;
                    resolve(animal);
                }
            }, err => {
                console.error('Error finding user: ', err);
                reject(new Error('No existe el animal'));
            })
        });
    }

    obtenerDatosGanadoIds(ids: Array<IEIdentification>): Promise<IEAnimal[]> {
        let arrayIdString: Array<string> = new Array<string>();
        if (ids && ids.length > 0) {
            for (let iden of ids) {
                arrayIdString.push(iden.id);
            }
            return new Promise((resolve, reject) => {
                return this.conn.getObjects(arrayIdString).subscribe((ganado: IEAnimal[]) => {
                    if (ganado == null) {
                        reject(new Error('No existe ganado'));
                    } else {
                        resolve(ganado);
                    }
                }, err => {
                    console.error('Error finding user: ', err);
                    reject(new Error('No existe el usuario'));
                })
            });
        }
        return null;
    }

    getBusquedaAscDesc(arrayAnimales: IEAnimal[] | number[]): IEAnimal[] {
        throw new Error('Method not implemented.');
    }

    guardaAnimal(animal: IEAnimal): Promise<IEAnimal> {
        let animWithoutRelatives:IEAnimal=animal.toJSON() as IEAnimal;
        return new Promise((resolve, reject) => {
            this.conn.addObjectWithoutID(animWithoutRelatives).then(function (docRef) {
                resolve(docRef);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No guardado'));
                });;
        });
    }

    actualizarAnimal(animal: IEAnimal): Promise<IEAnimal> {
        //let animWithoutRelatives:IEAnimal=animal.toJSON() as IEAnimal;
        var rebano=this.ganado;
        return new Promise((resolve, reject) => {
            this.conn.updateObject(animal).then(function (docRef) {
                let index = rebano.findIndex(x => x.id === animal.id);
                rebano[index] = animal;
                resolve(animal);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No actualizado'));
                });;
        });
    }

    encontrarAnimal(animal: IEIdentification): IEAnimal {
        return this.ganado.find(x => x.id === animal.id);
    }

}