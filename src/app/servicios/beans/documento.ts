import { IEDocumento } from './interfaces/documento.interface';

export class Documento implements IEDocumento{

	id: string;

	nombre: string;

	urlMovil: string;

	tipo: string;

	metadatoEmail: string;

	metadatoFechaMod: Date;

	constructor() {
		this.id = "";
		this.nombre="";
		this.tipo="";
	}

    toJSON():{} {
        var json=Object.assign({}, this);
        return json;
    }

    fromJSON(json: IEDocumento|string): IEDocumento {
        if (typeof json === 'string') {
			let docu:IEDocumento;
            return JSON.parse(json, docu.reviver);
        } else {
            let docu = Object.create(Documento.prototype);
            return Object.assign(docu, json,{
                metadatoFechaMod: (json["metadatoFechaMod"]==null || json["metadatoFechaMod"].toString()=="") ? null : new Date(json["metadatoFechaMod"])
            });
        }
    }

    reviver(key: string, value: any): any {
		let docu:IEDocumento;
        return key === "" ? docu.fromJSON(value) : value;
    }


}