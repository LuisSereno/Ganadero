import {Macho} from './macho';
import {Hembra} from './hembra';
import {Compra} from './compra';
import {Venta} from './venta';
import {Documento} from './documento';

export class Explotacion {

	private id: number;

	private nombre: string;

	private emailUsu: string;

	private fechaAlta: Date;

	private fechaUltimaEntrada: Date;

	private dineroTotal: number;

	private dineroAnual: number;

	private arrayMachos: Array<Macho>;

	private arrayHembras: Array<Hembra>;

	private arrayCompras: Array<Compra>;

	private arrayVentas: Array<Venta>;

	private arrayDocumentos: Array<Documento>;

	constructor() {
		this.id = 0;
		this.nombre="";
		this.emailUsu="";
		this.fechaAlta=new Date();
		this.fechaUltimaEntrada=new Date();
		this.dineroTotal=0;
		this.dineroAnual=0;
		this.arrayMachos=new Array<Macho>();
		this.arrayHembras=new Array<Hembra>();
		this.arrayCompras=new Array<Compra>();
		this.arrayVentas=new Array<Venta>();
		this.arrayDocumentos=new Array<Documento>();

	}

	public getId(): number {
		return this.id;
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

	public getEmailUsu(): string {
		return this.emailUsu;
	}

	public setEmailUsu(email:string){
		this.emailUsu = email;
	}

	public getFechaAlta(): Date {
		return this.fechaAlta;
	}

	public setFechaAlta(fech: Date) {
		this.fechaAlta = fech;
	}

	public getFechaUltimaEntrada(): Date {
		return this.fechaUltimaEntrada;
	}

	public setFechaUltimaEntrada(fech: Date) {
		this.fechaUltimaEntrada = fech;
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

}