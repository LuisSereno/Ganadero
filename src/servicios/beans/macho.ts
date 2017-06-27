import {Animal} from './animal';
import {Constantes} from '../constantes';

export class Macho extends Animal{


	constructor(id:number,alias:string,raza:string,foto:string,
		numero:number,fechaNacimiento:Date,vacu:Array<string>,
		enfer:Array<string>,
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


 /**
       ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
	   http://choly.ca/post/typescript-json/
    **/
    // toJSON is automatically used by JSON.stringify
    toJSON():{} {
        // copy all fields from `this` to an empty object and return in
        var json=Object.assign({}, this);

        var arrayIds:Array<number>=new Array<number>();
        for (let anim of this.getDescendencia()){
            arrayIds.push(anim.getId());
        }
        //json["descendencia"]=arrayIds;

        arrayIds=new Array<number>();
        for (let anim of this.getAscendencia()){
            arrayIds.push(anim.getId());
        }       
        //json["ascendencia"]=arrayIds;

        json["sexo"]=Constantes.MACHO;
        
        return json;
    }

    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    static fromJSON(json: Macho|string): Macho {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Macho.reviver);
        } else {
            // create an instance of the User class
            let mach = Object.create(Macho.prototype);

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
            return Object.assign(mach, json,{
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                fechaNacimiento: (json["fechaNacimiento"]==null || json["fechaNacimiento"].toString()=="") ? null : new Date(json["fechaNacimiento"])            

            });
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    static reviver(key: string, value: any): any {
        return key === "" ? Macho.fromJSON(value) : value;
    }
}