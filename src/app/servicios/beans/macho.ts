import { IEAnimal } from './interfaces/animal.interface';
import {Animal} from './animal';
import {Constantes} from '../genericos/constantes';
import { IEVacunaAnimal } from './interfaces/vacunaAnimal.interface';
import { IEEnfermedadAnimal } from './interfaces/enfermedadAnimal.interface';

export class Macho extends Animal{

	constructor(id:string,alias:string,raza:string,foto:string,
		numero:number,fechaNacimiento:Date,vacu:Array<IEVacunaAnimal>,
		enfer:Array<IEEnfermedadAnimal>,
		ascen:Array<IEAnimal>,descen:Array<IEAnimal>,precioCompra:number,precioVenta:number){
		super();
		this.setId(id);
		this.setAlias(alias);
		this.setRaza(raza);
		this.setFoto(foto);
		this.setNumero(numero);
		this.setFechaNacimiento(fechaNacimiento);
		this.setVacunas(vacu);
		this.setEnfermedades(enfer);
		this.setAscendencia(ascen);
		this.setDescendencia(descen);
		this.setPrecioCompra(precioCompra);
		this.setPrecioVenta(precioVenta);
	}

    public getFoto()  : string{
        if (super.getFoto()!=null){
            return super.getFoto();
        }else{
            return Constantes.FOTO_ANIMAL_MACHO_DEFECTO;
        }
    }

    toJSON():{} {
        const { ascendencia,descendencia, ...rest } = this;
        const projectedObject = rest;

        return projectedObject;
    }

    static fromJSON(json: IEAnimal|string): Macho {
        console.log("FROMJSON MACHO");
        console.log(json);
        if (typeof json === 'string') {
            return JSON.parse(json, Macho.reviver);
        } else {
            let mach = Object.create(Macho.prototype);
            return Object.assign(mach, json,{
                id:json["id"],
                fechaNacimiento: (json["fechaNacimiento"]==null || json["fechaNacimiento"].toString()=="") ? null : new Date(json["fechaNacimiento"]) ,
                metadatoFechaMod: (json["metadatoFechaMod"]==null || json["metadatoFechaMod"].toString()=="") ? null : new Date(json["metadatoFechaMod"])

            });
        }
    }

    static reviver(key: string, value: any): any {
        return key === "" ? Macho.fromJSON(value) : value;
    }
}