import {Operacion} from './operacion';
import {Animal} from './animal';

export class Compra extends Operacion{

	constructor(id:number,agru:string,animales:Array<Animal>,pCompra:number,fecha:Date){
		super();
		this.setId(id);
		this.setAgrupacion(agru);
		this.setAnimales(animales);
		this.setPrecio(pCompra);
		this.setFecha(fecha);
	}

	/**
       ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
	   http://choly.ca/post/typescript-json/
    **/
    // toJSON is automatically used by JSON.stringify
    toJSON():{} {
        // copy all fields from `this` to an empty object and return in
        var json=Object.assign({}, this);
 
        return json;
    }

    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    static fromJSON(json: Compra|string): Compra {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Compra.reviver);
        } else {
            // create an instance of the User class
            let mach = Object.create(Compra.prototype);

/**            let jsonNuevo = {
                idCliente: json["_idCliente"],
                nombreCliente: json["_nombreCliente"],
                url: json["_url"],
                dominio: json["_dominio"],
                fecha: json["_fecha"],
                licMov: json["_licMov"],
                licWeb: json["_licWeb"],
                clienteActivo: json["_clienteActivo"],
                maps: json["_maps"]
            }**/
            // copy all the fields from the json object
            return Object.assign(mach, json,{
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                fecha: (json["fecha"]==null || json["fecha"].toString()=="") ? null : new Date(json["fecha"])});
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    static reviver(key: string, value: any): any {
        return key === "" ? Compra.fromJSON(value) : value;
    }
}