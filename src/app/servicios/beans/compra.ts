import {Operacion} from './operacion';
import {Animal} from './animal';
import {Constantes} from '../genericos/constantes';
export class Compra extends Operacion{

	constructor(id:string,agru:string,animales:Array<Animal>,pCompra:number,fecha:Date){
		super();
		this.id=id;
		this.agrupacion = agru;
		this.animales = animales;
		this.precio = pCompra;
		this.fechaOperacion = fecha;
	}

    toJSON():{} {
        var json=Object.assign({}, this);
        json["tipo"]=Constantes.COMPRA;
        return json;
    }

    static fromJSON(json: Compra|string): Compra {
        if (typeof json === 'string') {
            return JSON.parse(json, Compra.reviver);
        } else {
            let mach = Object.create(Compra.prototype);
            return Object.assign(mach, json,{
                fechaOperacion: (json["fechaOperacion"]==null || json["fechaOperacion"].toString()=="") ? null : new Date(json["fechaOperacion"])});
        }
    }

    static reviver(key: string, value: any): any {
        return key === "" ? Compra.fromJSON(value) : value;
    }
}
