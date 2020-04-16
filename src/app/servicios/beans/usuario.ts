import { IEUsuario } from './interfaces/usuario.interface';
import { IEExplotacion } from './interfaces/explotacion.interface';

export class Usuario implements IEUsuario{

	id?: string;

	nombre: string;

	email: string;

	metadatoEmail: string;

    metadatoFechaMod: Date;
    
    explotaciones: Array<IEExplotacion>;
  
    constructor(nombre:string,email:string,id?:string, explotaciones?: Array<IEExplotacion>) {
        
        this.id = id!==undefined?id:null;
		this.nombre=nombre;
        this.email=email;
        this.explotaciones = explotaciones!==undefined?explotaciones:null;;
    }
    
    fromJSON(json: string | IEUsuario): IEUsuario {
        if (typeof json === 'string') {
			let usu:IEUsuario;
            return JSON.parse(json, usu.reviver);
        } else {
            let mach = Object.create(Usuario.prototype);
            return Object.assign(mach, json,{});
        }
    }

    toJSON():{} {
        var json=Object.assign({}, this);
        return json;
    }



    reviver(key: string, value: any): any {
		let usu:IEUsuario;
        return key === "" ? usu.fromJSON(value) : value;
    }

}