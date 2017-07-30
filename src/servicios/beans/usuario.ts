import {Metadatos} from './metadatos';

export class Usuario extends Metadatos {

	private identificador: number;

	private nombre: string;

	private email: string;

	//private fechaAlta: Date;

	constructor() {
        super();
		this.identificador = 0;
		this.nombre="";
		this.email="";
	}

	public getId(): number {
		return +this.identificador;
	}

	public setId(identificador: number) {
		this.identificador = identificador;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setNombre(nombre:string){
		this.nombre = nombre;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(email:string){
		this.email = email;
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
    static fromJSON(json: Usuario|string): Usuario {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Usuario.reviver);
        } else {
            // create an instance of the User class
            let mach = Object.create(Usuario.prototype);
            // copy all the fields from the json object
            return Object.assign(mach, json,{
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
          //      fechaAlta: (json["fechaAlta"]==null || json["fechaAlta"].toString()=="") ? null : new Date(json["fechaAlta"])
               	});
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    static reviver(key: string, value: any): any {
        return key === "" ? Usuario.fromJSON(value) : value;
    }


}