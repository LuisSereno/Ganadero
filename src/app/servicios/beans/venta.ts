import {Operacion} from './operacion';
import {Animal} from './animal';
import {Constantes} from '../genericos/constantes';

export class Venta extends Operacion{

	constructor(id:string,agru:string,animales:Array<Animal>,pVenta:number,fecha:Date){
		super();
		this.id=id;
		this.agrupacion = agru;
		this.animales = animales;
		this.precio = pVenta;
		this.fechaOperacion = fecha;
	}

    toJSON():{} {
        var json=Object.assign({}, this);
        json["tipo"]=Constantes.VENTA;
        return json;
    }

    static fromJSON(json: Venta|string): Venta {
        if (typeof json === 'string') {
            return JSON.parse(json, Venta.reviver);
        } else {
            let mach = Object.create(Venta.prototype);
            return Object.assign(mach, json,{
                fechaOperacion: (json["fechaOperacion"]==null || json["fechaOperacion"].toString()=="") ? null : new Date(json["fechaOperacion"])});
        }
    }

    static reviver(key: string, value: any): any {
        return key === "" ? Venta.fromJSON(value) : value;
    }
}
