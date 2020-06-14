import { IEEnfermedad } from './interfaces/enfermedad.interface';
import { IEVacuna } from './interfaces/vacuna.interface';

export class Enfermedad implements IEEnfermedad{

    id?: string;
    nombre: string;
    descripcion?: string;
    fecha?: Date;
    vacunasUtilizadas?:Array<IEVacuna>;
    metadatoEmail?: string;
    metadatoFechaMod?: Date;


	constructor() {
		this.id = '';
        this.nombre='';
        this.descripcion='';
        this.vacunasUtilizadas=null;
        this.fecha=null;
    }

    toJSON(): {} {
        const {...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }
    fromJSON(json: string | IEEnfermedad): IEEnfermedad {
        if (typeof json === 'string') {
			let enf:IEEnfermedad;
            return JSON.parse(json, enf.reviver);
        } else {
            const mach = Object.create(Enfermedad.prototype);

            return Object.assign(mach, json,{
                id:json.id,
                fecha: (json.fecha==null || json.fecha.toString()==='')
                ? null : new Date(json.fecha),
                metadatoFechaMod: (json.metadatoFechaMod==null || json.metadatoFechaMod.toString()==='')
                ? null : new Date(json.metadatoFechaMod)
            	});
        }
    }
    reviver(key: string, value: any) {
		let enf:IEEnfermedad;
        return key === '' ? enf.fromJSON(value) : value;
    }

}