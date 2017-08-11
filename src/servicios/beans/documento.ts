import {Metadatos} from './metadatos';

export class Documento extends Metadatos{

	private id: number;

	private nombre: string;

	private urlMovil: string;

	private tipo: string;

/*	private fechaAlta: Date;

	private usuarioAlta: string;
*/

	constructor() {
		super();
		this.id = 0;
		this.nombre="";
		this.tipo="";
//		this.fechaAlta=new Date();
//		this.usuarioAlta="";
	}

	public getId(): number {
		return this.id;
	}

	public setId(identificador: number) {
		this.id = identificador;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setNombre(nom: string) {
		this.nombre = nom;
	}

	public getUrlMovil(): string {
		return this.urlMovil;
	}

	public setUrlMovil(url: string) {
		this.urlMovil = url;
	}

	public getTipo(): string {
		return this.tipo;
	}

	public setTipo(tip: string) {
		this.tipo = tip;
	}

/*	public getFechaAlta(): Date {
		return this.fechaAlta;
	}

	public setFechaAlta(fecha: Date) {
		this.fechaAlta = fecha;
	}

	public setUsuarioAlta(usuario: string) {
		this.usuarioAlta = usuario;
	}

	public getUsuarioAlta(): string {
		return this.usuarioAlta;
	}

*/

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
    static fromJSON(json: Documento|string): Documento {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Documento.reviver);
        } else {
            // create an instance of the User class
            let docu = Object.create(Documento.prototype);

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
            return Object.assign(docu, json,{
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                metadatoFechaMod: (json["metadatoFechaMod"]==null || json["metadatoFechaMod"].toString()=="") ? null : new Date(json["metadatoFechaMod"])
            });
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    static reviver(key: string, value: any): any {
        return key === "" ? Documento.fromJSON(value) : value;
    }


}