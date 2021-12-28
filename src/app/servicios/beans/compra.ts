import {Operacion} from './operacion';
import {Animal} from './animal';
import {Constantes} from '../genericos/constantes';
import { IEIdentification } from './interfaces/identification.interface';
import { IEAnimal } from './interfaces/animal.interface';
import { IEOperacion } from './interfaces/operacion.interface';
export class Compra extends Operacion{

	constructor(id:string,agru:string,animales:Array<IEAnimal>,pCompra:number,fecha:Date){
		super();
		this.id=id;
		this.agrupacion = agru;
		this.animales = animales;
		this.precio = pCompra;
		this.fechaOperacion = fecha;
        this.tipo=Constantes.COMPRA;
	}

    toJSON():{} {
        //var json=Object.assign({}, this);
        //json["tipo"]=Constantes.COMPRA;
        //return json;
        const { animales, ...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }

    static fromJSON(json: IEOperacion|string): Compra {
        if (typeof json === 'string') {
            return JSON.parse(json, Compra.reviver);
        } else {
            let mach = Object.create(Compra.prototype);
            return Object.assign(mach, json,{
                fechaOperacion: (json["fechaOperacion"]==null || json["fechaOperacion"].toString()=="") ? null : new Date(json["fechaOperacion"]),
                animales: new Array<IEAnimal>(),
                id: (json["id"])});
        }
    }

    static reviver(key: string, value: any): any {
        return key === "" ? Compra.fromJSON(value) : value;
    }
}
