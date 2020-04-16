import {Constantes} from '../genericos/constantes';
import { Animal } from './animal';
import { IEAnimal } from './interfaces/animal.interface';

export class Hembra extends Animal{

	constructor(id:string,alias:string,raza:string,foto:string,
		numero:number,fechaNacimiento:Date,vacu:Array<string>,
		enfer:Array<string>,fechaUltimoNacimiento:Date,
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
        this.setFechaUltimoNacimiento(fechaUltimoNacimiento);
        this.setAscendencia(ascen);
        this.setDescendencia(descen);
        this.setPrecioCompra(precioCompra);
        this.setPrecioVenta(precioVenta);
    }
    
	public setFechaUltimoNacimiento(fecUlti:Date){
		this.fechaUltimoNacimiento = fecUlti;
	}

	public getFechaUltimoNacimiento()  : Date{
        try{
            var timestamp=Date.parse(this.fechaUltimoNacimiento.toLocaleDateString())
            if (isNaN(timestamp)){
                this.fechaUltimoNacimiento=null;
            }
        }catch(e){
            console.error(e);
        }finally{
            return this.fechaUltimoNacimiento;
        }

	}

    public getFoto()  : string{
        if (this.getFoto()!=null){
            return this.getFoto();            
        }else{
            return Constantes.FOTO_ANIMAL_DEFECTO;
        }
    }


    toJSON():{} {
        var json=Object.assign({}, this);
        var arrayIds:Array<string>=new Array<string>();
        if (this.getDescendencia()){
            for (let anim of this.getDescendencia()){
                arrayIds.push(anim.id);
            }
        }
        json["descendenciaIds"]=arrayIds;

        arrayIds=new Array<string>();
        
        if (this.getAscendencia()){
            for (let anim of this.getAscendencia()){
                arrayIds.push(anim.id);
            }  
        }     
        json["ascendenciaIds"]=arrayIds;

        json["sexo"]=Constantes.HEMBRA;

        return json;
    }

    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    static fromJSON(json: Hembra|string): Hembra {
        if (typeof json === 'string') {
            return JSON.parse(json, Hembra.reviver);
        } else {
            let hemb = Object.create(Hembra.prototype);
            return Object.assign(hemb, json,{
                id:json["identificador"],
                fechaNacimiento: (json["fechaNacimiento"]==null || json["fechaNacimiento"].toString()=="") ? null : new Date(json["fechaNacimiento"]),
                fechaUltimoNacimiento: (json["fechaUltimoNacimiento"]==undefined || json["fechaUltimoNacimiento"]==null || json["fechaUltimoNacimiento"].toString()=="") ? null : new Date(json["fechaUltimoNacimiento"]),
                metadatoFechaMod: (json["metadatoFechaMod"]==null || json["metadatoFechaMod"].toString()=="") ? null : new Date(json["metadatoFechaMod"])

            });
        }
    }

    static reviver(key: string, value: any): any {
        return key === "" ? Hembra.fromJSON(value) : value;
    }

}