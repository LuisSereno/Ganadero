import { Injectable, Inject } from '@angular/core';
import { IEEnfermedadServicio } from './interfaces/enfermedad.service.interface';
import { IEEnfermedad } from './beans/interfaces/enfermedad.interface';
import { IEIdentification } from './beans/interfaces/identification.interface';
import { Constantes } from './genericos/constantes';
import { ConexionGenericaService } from './conexionGenerica.service';


@Injectable()
export class EnfermedadServicio  implements IEEnfermedadServicio{


    enfermedades: IEEnfermedad[];

    enfermedadesExplotacion: IEEnfermedad[];

    constructor(@Inject('EnfermedadConexionServicio') private conn: ConexionGenericaService<IEEnfermedad>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + 'enfermedades');
        this.enfermedadesExplotacion=new Array<IEEnfermedad>();
        this.enfermedades=new Array<IEEnfermedad>();
    }

    obtenerTodasEnfermedades(): Promise<IEEnfermedad[]> {
        return new Promise((resolve, reject) => {
            return this.conn.getObjects(null).subscribe((enfermedades: IEEnfermedad[]) => {
                if (enfermedades == null) {
                    reject(new Error('No existe enfermedad'));
                } else {
                    this.enfermedades=enfermedades;
                    resolve(enfermedades);
                }
            }, err => {
                console.error('Error finding enfermedad: ', err);
                reject(new Error('No existe la enfermedad'));
            })
        });
    }

    obtenerDatosEnfermedades(enfermedad: IEEnfermedad): Promise<IEEnfermedad> {
        //throw new Error('Method not implemented.');
        return new Promise((resolve, reject) => {
            return this.conn.getObject(btoa(enfermedad.id)).subscribe((anim: IEEnfermedad) => {
                if (anim == null) {
                    reject(new Error('No existe la enfermedad'));
                } else {
                    enfermedad = anim;
                    resolve(enfermedad);
                }
            }, err => {
                console.error('Error finding user: ', err);
                reject(new Error('No existe la enfermedad'));
            })
        });
    }

    obtenerDatosEnfermedadIds(ids: IEIdentification[]): Promise<IEEnfermedad[]> {
        //throw new Error('Method not implemented.');
        const arrayIdString: Array<string> = new Array<string>();
        if (ids && ids.length > 0) {
            for (const iden of ids) {
                arrayIdString.push(iden.id);
            }
            return new Promise((resolve, reject) => {
                return this.conn.getObjects(arrayIdString).subscribe((enfermedades: IEEnfermedad[]) => {
                    if (enfermedades == null) {
                        reject(new Error('No existe enfermedad'));
                    } else {
                        resolve(enfermedades);
                    }
                }, err => {
                    console.error('Error finding enfermedad: ', err);
                    reject(new Error('No existe la enfermedad'));
                })
            });
        }
        return null;
    }

    getBusquedaAscDesc(arrayEnfermedades: IEEnfermedad[] | number[]): IEEnfermedad[] {
        throw new Error('Method not implemented.');
    }

    guardaEnfermedad(enfermedad: IEEnfermedad): Promise<IEEnfermedad> {
        //throw new Error('Method not implemented.');
        const enfermedadAux:IEEnfermedad=enfermedad.toJSON() as IEEnfermedad;
        return new Promise((resolve, reject) => {
            this.conn.addObjectWithoutID(enfermedadAux).then(function (docRef) {
                resolve(docRef);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No guardado'));
                });;
        });
    }

    actualizarEnfermedad(enfermedad: IEEnfermedad): Promise<IEEnfermedad> {
        //throw new Error('Method not implemented.');
        var conjuntoEnfermedades=this.enfermedades;
        return new Promise((resolve, reject) => {
            this.conn.updateObject(enfermedad).then(function (docRef) {
                let index = conjuntoEnfermedades.findIndex(x => x.id === enfermedad.id);
                conjuntoEnfermedades[index] = enfermedad;
                resolve(enfermedad);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No actualizado'));
                });;
        });
    }

    encontrarEnfermedad(enfermedad: IEIdentification, soloExplotacion:boolean=true): IEEnfermedad {
        //throw new Error('Method not implemented.');
        if (soloExplotacion){
            return this.enfermedadesExplotacion.find(x => x.id === enfermedad.id);
        }else{
            return this.enfermedades.find(x => x.id === enfermedad.id);
        }
    }


}