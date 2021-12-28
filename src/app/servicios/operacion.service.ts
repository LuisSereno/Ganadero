import { Inject, Injectable } from '@angular/core';
import { Compra } from './beans/compra';
import { IEAnimal } from './beans/interfaces/animal.interface';
import { IEIdentification } from './beans/interfaces/identification.interface';
import { IEOperacion } from './beans/interfaces/operacion.interface';
import { Operacion } from './beans/operacion';
import { Venta } from './beans/venta';
import { ConexionGenericaService } from './conexionGenerica.service';
import { Constantes } from './genericos/constantes';
import { IEoperacionServicio } from './interfaces/operacion.service.interface';

@Injectable()
export class OperacionServicio  implements IEoperacionServicio{

    compraExplotacion: Compra[];

    ventaExplotacion: Venta[];

    totalDineroCompra: number;

    totalDineroVenta: number;

    operacionSeleccionada:Operacion;

    constructor(@Inject('OperacionConexionServicio') private conn: ConexionGenericaService<IEOperacion>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + 'operaciones');
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

    anadirOperacion(operacion: IEOperacion): Promise<IEOperacion> {
        if (operacion instanceof Compra){
            this.compraExplotacion.push(operacion);
        }else if (operacion instanceof Venta){
            this.ventaExplotacion.push(operacion);
        }
        return new Promise((resolve, reject) => {
            this.conn.addObjectWithoutID(operacion).then(function (docRef) {
                resolve(docRef);
            })
                .catch(function (error) {
                    console.error('Error adding document: ', error);
                    reject(new Error('No guardado'));
                });;
        });
    }

    actualizarOperacion(operacion: IEOperacion) {
        throw new Error('Method not implemented.');
    }

    obtenerDatosOperacion(operacion: IEOperacion): Promise<IEOperacion> {
        throw new Error('Method not implemented.');
    }

    obtenerDatosOperaciones(ids: IEIdentification[]): Promise<IEOperacion[]> {
        let arrayIdString: Array<string> = new Array<string>();
        if (ids && ids.length > 0) {
            for (let iden of ids) {
                arrayIdString.push(iden.id);
            }
            return new Promise((resolve, reject) => {
                return this.conn.getObjects(arrayIdString).subscribe((operacion: IEOperacion[]) => {
                    if (operacion == null) {
                        reject(new Error('No la operacion'));
                    } else {
                        resolve(operacion);
                    }
                }, err => {
                    console.error('Error finding user: ', err);
                    reject(new Error('No existe la operacion'));
                })
            });
        }
        return null;
    }

    encontrarOperacion(operacion: IEIdentification, soloCompra:boolean=true): IEOperacion {
        //throw new Error('Method not implemented.');
        if (soloCompra){
            return this.compraExplotacion.find(x => x.id === operacion.id);
        }else{
            return this.ventaExplotacion.find(x => x.id === operacion.id);
        }
    }

    borrarOperacion(operacionId: IEIdentification){
        return new Promise((resolve, reject) => {
            this.conn.deleteObject(operacionId.id).then(function (docRef) {
                resolve(docRef);
            })
                .catch(function (error) {
                    console.error('Error deleting document: ', error);
                    reject(new Error('No borrado'));
                });;
        });
    }
}