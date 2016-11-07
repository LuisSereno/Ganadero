export class Documento {

	private id: number;

	private nombre: string;

	private url: string;

	private tipo: string;

	private fechaAlta: Date;


	constructor() {
		this.id = 0;
		this.nombre="";
		this.url="";
		this.tipo="";
		this.fechaAlta=new Date();
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

	public setNombre(nom: string) {
		this.nombre = nom;
	}

	public getUrl(): string {
		return this.url;
	}

	public setUrl(url: string) {
		this.url = url;
	}

	public getTipo(): string {
		return this.tipo;
	}

	public setTipo(tip: string) {
		this.tipo = tip;
	}

	public getFechaAlta(): Date {
		return this.fechaAlta;
	}

	public setFechaAlta(fecha: Date) {
		this.fechaAlta = fecha;
	}


}