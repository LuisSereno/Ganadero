import { Enfermedad } from './enfermedad';
import { IEEnfermedad } from './interfaces/enfermedad.interface';
import { IEEnfermedadAnimal } from './interfaces/enfermedadAnimal.interface';
import { IEVacuna } from './interfaces/vacuna.interface';
import { IEVacunaAnimal } from './interfaces/vacunaAnimal.interface';

export class EnfermedadAnimal implements IEEnfermedadAnimal{

    id?: string;

    enfermedad:IEEnfermedad;

	fecha: Date;

	vacunasUtilizadas?:Array<IEVacunaAnimal>;

    metadatoEmail?: string;

    metadatoFechaMod?: Date;

	constructor() {
		this.id = '';
        this.vacunasUtilizadas=null;
        this.fecha=null;
        this.enfermedad=null;
    }

    toJSON(): {} {
        const {...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }
    fromJSON(json: string | IEEnfermedadAnimal): IEEnfermedadAnimal {
        if (typeof json === 'string') {
			let enf:IEEnfermedadAnimal;
            return JSON.parse(json, enf.reviver);
        } else {
            const mach = Object.create(EnfermedadAnimal.prototype);

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
		let enf:IEEnfermedadAnimal;
        return key === '' ? enf.fromJSON(value) : value;
    }

}