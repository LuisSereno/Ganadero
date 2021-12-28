import { IEOperacion } from './interfaces/operacion.interface';
import { IEAnimal } from './interfaces/animal.interface';
import { IEExplotacion } from './interfaces/explotacion.interface';
import { IEDocumento } from './interfaces/documento.interface';
import { IEParcela } from './interfaces/parcela.interface';
import { Compra } from './compra';
import { Venta } from './venta';
import { Macho } from './macho';
import { Hembra } from './hembra';
import { Documento } from './documento';
import { IEIdentification } from './interfaces/identification.interface';
import { IEVacuna } from './interfaces/vacuna.interface';
import { IEEnfermedad } from './interfaces/enfermedad.interface';


export class Explotacion implements IEExplotacion{

	id?: string;

	nombre: string;

	usuarios: Array<IEIdentification>;

	fechaAlta: Date;

	dineroTotal?: number;

	dineroAnual?: number;

	arrayMachos?: Array<IEAnimal>;

	arrayHembras?: Array<IEAnimal>;

	arrayCompras?: Array<IEOperacion>;

	arrayVentas?: Array<IEOperacion>;

	arrayDocumentos?: Array<IEDocumento>;

	arrayParcelas?: Array<IEParcela>;

	arrayVacunas?: Array<IEVacuna>;

	arrayEnfermedades?: Array<IEEnfermedad>;

	arrayIdAnimales ?: Array<IEIdentification>;

	arrayIdOperaciones ?: Array<IEIdentification>;

	arrayIdDocumentos ?: Array<IEIdentification>;

	arrayIdParcelas ?: Array<IEIdentification>;

	arrayIdVacunas ?: Array<IEIdentification>;

	arrayIdEnfermedades ?: Array<IEIdentification>;

	metadatoEmail?: string;

	metadatoFechaMod?: Date;

	constructor() {
		this.id = '';
		this.nombre='';
		this.usuarios=null;
		this.fechaAlta=new Date();
		this.dineroTotal=0;
		this.dineroAnual=0;
		this.arrayMachos=new Array<Macho>();
		this.arrayHembras=new Array<Hembra>();
		this.arrayCompras=new Array<Compra>();
		this.arrayVentas=new Array<Venta>();
		this.arrayDocumentos=new Array<Documento>();
		this.arrayParcelas=new Array<IEParcela>();
		this.arrayVacunas=new Array<IEVacuna>();
		this.arrayEnfermedades=new Array<IEEnfermedad>();
	}
	fromJSON(json: string | IEExplotacion): IEExplotacion {
		return Explotacion.fromJSON(json);
	}

    toJSON():{} {
        const { arrayMachos,arrayHembras, ...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }

    static fromJSON(json: IEExplotacion|string): Explotacion {
        if (typeof json === 'string') {
			let explo:IEExplotacion;
            return JSON.parse(json, explo.reviver);
        } else {
            let mach = Object.create(Explotacion.prototype);

            return Object.assign(mach, json,{
                fechaAlta: (json["fechaAlta"]==null || json["fechaAlta"].toString()=="") ? null : new Date(json["fechaAlta"]),
            	id: (json["id"]),
            	arrayMachos: new Array<IEAnimal>(),
            	arrayHembras: new Array<IEAnimal>(),
            	arrayVentas: new Array<IEOperacion>(),
            	arrayCompras: new Array<IEOperacion>(),
            	arrayDocumentos: new Array<IEDocumento>()

            	});
        }
    }

    reviver(key: string, value: any): any {
		let explo:IEExplotacion;
        return key === "" ? explo.fromJSON(value) : value;
    }


}