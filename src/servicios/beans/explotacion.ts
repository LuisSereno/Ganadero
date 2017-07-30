import {Macho} from './macho';
import {Hembra} from './hembra';
import {Compra} from './compra';
import {Venta} from './venta';
import {Documento} from './documento';
import {Usuario} from './usuario';
import {Metadatos} from './metadatos'

export class Explotacion extends Metadatos{

	private id: number;

	private nombre: string;

	private usuario: Usuario;

	private fechaAlta: Date;

	private dineroTotal: number;

	private dineroAnual: number;

	private arrayMachos: Array<Macho>;

	private arrayHembras: Array<Hembra>;

	private arrayCompras: Array<Compra>;

	private arrayVentas: Array<Venta>;

	private arrayDocumentos: Array<Documento>;

	constructor() {
		super();
		this.id = 0;
		this.nombre="";
		this.usuario=null;
		this.fechaAlta=new Date();
		this.dineroTotal=0;
		this.dineroAnual=0;
		this.arrayMachos=new Array<Macho>();
		this.arrayHembras=new Array<Hembra>();
		this.arrayCompras=new Array<Compra>();
		this.arrayVentas=new Array<Venta>();
		this.arrayDocumentos=new Array<Documento>();

	}

	public getId(): number {
		return +this.id;
	}

	public setId(identificador: number) {
		this.id = identificador;
	}

	public getNombre(): string {
		return this.nombre;
	}

	public setNombre(nombre:string){
		this.nombre = nombre;
	}

	public getUsuario(): Usuario {
		return this.usuario;
	}

	public setUsuario(usu:Usuario){
		this.usuario = usu;
	}

	public getFechaAlta(): Date {
		return this.fechaAlta;
	}

	public setFechaAlta(fech: Date) {
		this.fechaAlta = fech;
	}

	public getDineroTotal(): number {
		return this.dineroTotal;
	}

	public setDineroTotal(precio: number) {
		this.dineroTotal = precio;
	}

	public getDineroAnual(): number {
		return this.dineroAnual;
	}

	public setDineroAnual(precio: number) {
		this.dineroAnual = precio;
	}

	public getArrayMachos():Array<Macho>{
		return this.arrayMachos;
	}

	public setArrayMachos(arrayAnimal:Array<Macho>){
		this.arrayMachos = arrayAnimal;
	}

	public getArrayHembras():Array<Hembra>{
		return this.arrayHembras;
	}

	public setArrayHembras(arrayAnimal:Array<Hembra>){
		this.arrayHembras = arrayAnimal;
	}

	public getArrayCompras():Array<Compra>{
		return this.arrayCompras;
	}

	public setArrayCompras(arrayCompras:Array<Compra>){
		this.arrayCompras = arrayCompras;
	}

	public getArrayVentas():Array<Venta>{
		return this.arrayVentas;
	}

	public setArrayVentas(arrayVentas:Array<Venta>){
		this.arrayVentas = arrayVentas;
	}

	public getArrayDocumentos():Array<Documento>{
		return this.arrayDocumentos;
	}

	public setArrayDocumentos(arrayDocumentos:Array<Documento>){
		this.arrayDocumentos = arrayDocumentos;
	}


	/**
       ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
	   http://choly.ca/post/typescript-json/
    **/
    // toJSON is automatically used by JSON.stringify
    toJSON():{} {
        // copy all fields from `this` to an empty object and return in
        var json=Object.assign({}, this,{
        	identificador: (this.getId()),
        });
 
        return json;
    }

    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    static fromJSON(json: Explotacion|string): Explotacion {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Explotacion.reviver);
        } else {
            // create an instance of the User class
            let mach = Object.create(Explotacion.prototype);

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
                fechaAlta: (json["fechaAlta"]==null || json["fechaAlta"].toString()=="") ? null : new Date(json["fechaAlta"]),
            	id: (json["identificador"]),
            	arrayMachos: new Array<Macho>(),
            	arrayHembras: new Array<Hembra>(),
            	arrayVentas: new Array<Venta>(),
            	arrayCompras: new Array<Compra>(),
            	arrayDocumentos: new Array<Documento>()

            	});
        }
    }

    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    static reviver(key: string, value: any): any {
        return key === "" ? Explotacion.fromJSON(value) : value;
    }


}