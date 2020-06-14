import { IEVacuna } from './interfaces/vacuna.interface';

export class Vacuna implements IEVacuna{

    id?: string;
    nombre: string;
    descripcion?: string;
    fecha?: Date;
    metadatoEmail?: string;
    metadatoFechaMod?: Date;


	constructor() {
		this.id = '';
        this.nombre='';
        this.descripcion='';
        this.fecha=null;
    }

    toJSON(): {} {
        const {...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }
    fromJSON(json: string | IEVacuna): IEVacuna {
        if (typeof json === 'string') {
			let vacu:IEVacuna;
            return JSON.parse(json, vacu.reviver);
        } else {
            const mach = Object.create(Vacuna.prototype);

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
		let vacu:IEVacuna;
        return key === '' ? vacu.fromJSON(value) : value;
    }

}