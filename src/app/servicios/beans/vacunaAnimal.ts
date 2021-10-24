import { IEVacuna } from './interfaces/vacuna.interface';
import { IEVacunaAnimal } from './interfaces/vacunaAnimal.interface';

export class VacunaAnimal implements IEVacunaAnimal{

    id?: string;
    fecha: Date;
    vacuna:IEVacuna;
    metadatoEmail?: string;
    metadatoFechaMod?: Date;


	constructor() {
		this.id = '';
        this.vacuna=null;
        this.fecha=null;
    }

    toJSON(): {} {
        const {...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }
    fromJSON(json: string | IEVacunaAnimal): IEVacunaAnimal {
        if (typeof json === 'string') {
			let vacu:IEVacunaAnimal;
            return JSON.parse(json, vacu.reviver);
        } else {
            const mach = Object.create(VacunaAnimal.prototype);

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
		let vacu:IEVacunaAnimal;
        return key === '' ? vacu.fromJSON(value) : value;
    }

}