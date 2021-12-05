import { Injectable, Inject } from '@angular/core';
import { IEVacunaServicio } from './interfaces/vacuna.service.interface';
import { IEVacuna } from './beans/interfaces/vacuna.interface';
import { ConexionGenericaService } from './conexionGenerica.service';
import { Constantes } from './genericos/constantes';
import { IEIdentification } from './beans/interfaces/identification.interface';
import { IECompraVentaServicio } from './interfaces/compraVenta.service.interface';
import { Compra } from './beans/compra';
import { IEAnimal } from './beans/interfaces/animal.interface';
import { IEOperacion } from './beans/interfaces/operacion.interface';
import { Venta } from './beans/venta';
import { Operacion } from './beans/operacion';

@Injectable()
export class CompraVentaServicio  implements IECompraVentaServicio{

    compraExplotacion: Compra[];

    ventaExplotacion: Venta[];

    totalDineroCompra: number;

    totalDineroVenta: number;

    constructor(@Inject('VacunaConexionServicio') private conn: ConexionGenericaService<IEVacuna>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + 'vacunas');
        this.compraExplotacion=new Array<Compra>();
        this.ventaExplotacion=new Array<Venta>()
    }

    esCompra(compra: boolean) {
        throw new Error('Method not implemented.');
    }

    //VER DONDE SE UTILIZA ESTA FUNCION POR SI DEJA DE TENER SENTIDO
    //COMPROBAR PRIMERO SI LA OPERACION EXISTE, SI NO EXISTE ES UNA NUEVA OPERACION Y TENEMOS QUE CREARLA
    // SI EXISTE, SOLO ACTUALIZAMOS LOS ANIMALES
    anadirAnimal(anim: IEAnimal, operacion:Operacion) {
        if (operacion instanceof Compra){
            operacion.animales.push(anim);
            operacion.precio+=anim.precioCompra;

        }else{
            operacion.animales.push(anim);
            operacion.precio+=anim.precioVenta;

        }
    }

    anadirOperacion(operacion: IEOperacion) {
        if (operacion instanceof Compra){
            this.compraExplotacion.push(operacion);
        }else if (operacion instanceof Venta){
            this.ventaExplotacion.push(operacion);
        }
    }
    actualizarOperacion(operacion: IEOperacion) {
        throw new Error('Method not implemented.');
    }
    obtenerDatosOperacion(operacion: IEOperacion): Promise<IEOperacion> {
        throw new Error('Method not implemented.');
    }
    obtenerDatosOperaciones(ids: IEIdentification[]): Promise<IEOperacion[]> {
        throw new Error('Method not implemented.');
    }
    encontrarOperacion(operacion: IEIdentification): IEOperacion {
        throw new Error('Method not implemented.');
    }


    /*
    obtenerTodasVacunas(): Promise<IEVacuna[]> {
        return new Promise((resolve, reject) => {
            return this.conn.getObjects(null).subscribe((vacunas: IEVacuna[]) => {
                if (vacunas == null) {
                    reject(new Error('No existen vacunas'));
                } else {
                    this.vacunas=vacunas.filter(e=>e != null);
                    resolve(vacunas);
                }
            }, err => {
                console.error('Error finding vacunas: ', err);
                reject(new Error('No existe la vacunas'));
            })
        });
    }

    guardaVacuna(vacuna: IEVacuna): Promise<IEVacuna> {
        // throw new Error('Method not implemented.');
        const vacunaAux:IEVacuna=vacuna.toJSON() as IEVacuna;
        return new Promise((resolve, reject) => {
            this.conn.addObjectWithoutID(vacunaAux).then(function (docRef) {
                resolve(docRef);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No guardado'));
                });;
        });
    }
    actualizarVacuna(vacuna: IEVacuna): Promise<IEVacuna> {
        // throw new Error('Method not implemented.');
        let conjuntoVacunas=this.vacunas;
        return new Promise((resolve, reject) => {
            this.conn.updateObject(vacuna).then(function (docRef) {
                const index = conjuntoVacunas.findIndex(x => x.id === vacuna.id);
                conjuntoVacunas[index] = vacuna;
                resolve(vacuna);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No actualizado'));
                });;
        });
    }
    obtenerDatosVacunas(vacuna: IEVacuna): Promise<IEVacuna> {
        // throw new Error('Method not implemented.');
        return new Promise((resolve, reject) => {
            return this.conn.getObject(btoa(vacuna.id)).subscribe((anim: IEVacuna) => {
                if (anim == null) {
                    reject(new Error('No existe la vacuna'));
                } else {
                    vacuna = anim;
                    resolve(vacuna);
                }
            }, err => {
                console.error('Error finding user: ', err);
                reject(new Error('No existe la vacuna'));
            })
        });
    }
    obtenerDatosVacunaIds(ids: IEIdentification[]): Promise<IEVacuna[]> {
        // throw new Error('Method not implemented.');
        const arrayIdString: Array<string> = new Array<string>();
        if (ids && ids.length > 0) {
            for (const iden of ids) {
                arrayIdString.push(iden.id);
            }
            return new Promise((resolve, reject) => {
                return this.conn.getObjects(arrayIdString).subscribe((vacunas: IEVacuna[]) => {
                    if (vacunas == null) {
                        reject(new Error('No existe vacunas'));
                    } else {
                        resolve(vacunas.filter(e=>e != null));
                    }
                }, err => {
                    console.error('Error finding vacunas: ', err);
                    reject(new Error('No existe la vacunas'));
                })
            });
        }
        return null;
    }
    getBusquedaAscDesc(arrayVacunas: IEVacuna[] | number[]): IEVacuna[] {
        throw new Error('Method not implemented.');
    }

    encontrarVacuna(vacuna: IEIdentification, soloExplotacion:boolean=true): IEVacuna {
        // throw new Error('Method not implemented.');
        if (soloExplotacion){
            return this.vacunasExplotacion.find(x => x.id === vacuna.id);
        }else{
            return this.vacunas.find(x => x.id === vacuna.id);
        }
    }
*/
}