import {Animal} from './animal';
import {Constantes} from '../constantes';

export class Hembra extends Animal{

	private fechaUltimoNacimiento : Date;

	constructor(id:number,alias:string,raza:string,foto:string,
		numero:number,fechaNacimiento:Date,vacu:Array<string>,
		enfer:Array<string>,fechaUltimoNacimiento:Date,
		ascen:Array<Animal>,descen:Array<Animal>,precioCompra:number,precioVenta:number){
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
		return this.fechaUltimoNacimiento;
	}

    public getFoto()  : string{
        if (super.getFoto()!=null){
            return super.getFoto();            
        }else{
            return Constantes.FOTO_ANIMAL_DEFECTO;
        }
    }


 /**
       ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
	   http://choly.ca/post/typescript-json/
    **/
    // toJSON is automatically used by JSON.stringify
    toJSON():{} {
        // copy all fields from `this` to an empty object and return in
        var json=Object.assign({}, this);

        var arrayIds:Array<number>=new Array<number>();
        
        if (this.getDescendencia()){
            for (let anim of this.getDescendencia()){
                arrayIds.push(anim.getId());
            }
        }
        json["descendenciaIds"]=arrayIds;

        arrayIds=new Array<number>();
        
        if (this.getAscendencia()){
            for (let anim of this.getAscendencia()){
                arrayIds.push(anim.getId());
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
            // if it's a string, parse it first
            return JSON.parse(json, Hembra.reviver);
        } else {
            // create an instance of the User class
            let hemb = Object.create(Hembra.prototype);

/**            let jsonNuevo = {
                idCliente: json["_idCliente"],
                nombreCliente: json["_nombreCliente"],
                url: json["_url"],
                dominio: json["_dominio"],
                fecha: json["_fecha"],
                licMov: json["_licMov"],
                licWeb: json["_licWeb"],
                clienteActivo: json["_clienteActivo"],
                maps: json["_maps"]
            }**/
            // copy all the fields from the json object
            return Object.assign(hemb, json,{
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                id:json["identificador"],
                fechaNacimiento: (json["fechaNacimiento"]==null || json["fechaNacimiento"].toString()=="") ? null : new Date(json["fechaNacimiento"]),
                fechaUltimoNacimiento: (json["fechaUltimoNacimiento"]==null || json["fechaUltimoNacimiento"].toString()=="") ? null : new Date(json["fechaUltimoNacimiento"]),
                metadatoFechaMod: (json["metadatoFechaMod"]==null || json["metadatoFechaMod"].toString()=="") ? null : new Date(json["metadatoFechaMod"])

            });
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    static reviver(key: string, value: any): any {
        return key === "" ? Hembra.fromJSON(value) : value;
    }

}