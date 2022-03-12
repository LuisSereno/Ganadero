import {Operacion} from './operacion';
import {Constantes} from '../genericos/constantes';
import { IEAnimal } from './interfaces/animal.interface';
import { IEOperacion } from './interfaces/operacion.interface';
 export class Venta extends Operacion{

	constructor(id:string,agru:string,animales:Array<IEAnimal>,pVenta:number,fecha:Date){
		super();
		this.id=id;
		this.agrupacion = agru;
		this.animales = animales;
		this.precio = pVenta;
		this.fechaOperacion = fecha;
        this.tipo=Constantes.VENTA;
	}

    toJSON():{} {
        //var json=Object.assign({}, this);
        //json["tipo"]=Constantes.VENTA;
        //return json;
        const { animales, ...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }

    static fromJSON(json: IEOperacion|string): Venta {
        if (typeof json === 'string') {
            return JSON.parse(json, Venta.reviver);
        } else {
            let mach = Object.create(Venta.prototype);
            return Object.assign(mach, json,{
                fechaOperacion: (json["fechaOperacion"]==null || json["fechaOperacion"].toString()=="") ? null : new Date(json["fechaOperacion"]),
                animales: new Array<IEAnimal>(),
                id: (json["id"])});
        }
    }

    static reviver(key: string, value: any): any {
        return key === "" ? Venta.fromJSON(value) : value;
    }
}
