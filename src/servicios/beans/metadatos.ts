export class Metadatos{

	private metadatoEmail: string;

	private metadatoFechaMod: Date;

	constructor() {
		this.metadatoEmail = "";
		this.metadatoFechaMod= new Date();
	}

	public getMetaDatoEmail(): string {
		return this.metadatoEmail;
	}

	public setMetaDatoEmail(email:string){
		this.metadatoEmail = email;
	}

	public getMetaDatoFechaMod()  : Date{
		return this.metadatoFechaMod;
	}

	public setMetaDatoFechaMod(fecha:Date){
		this.metadatoFechaMod = fecha;
	}


}