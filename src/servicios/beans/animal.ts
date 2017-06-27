export abstract class Animal {

	private id: number;

	private alias: string;

	private raza: string;

	private foto: string;

	private numero: number;

	private fechaNacimiento: Date;

	private vacunas: Array<string>;

	private enfermedades: Array<string>;

	private ascendencia: Array<Animal>;

	private descendencia: Array<Animal>;

	private precioCompra: number;

	private precioVenta: number;

	constructor() {
		this.id = 0;
		this.alias="";
		this.raza="";
		this.foto="";
		this.numero=0
		this.fechaNacimiento = new Date();
		this.vacunas=new Array<string>();
		this.enfermedades=new Array<string>();
		this.ascendencia=new Array<Animal>();
		this.descendencia=new Array<Animal>();
		this.precioCompra=0;
		this.precioVenta=0;
	}

	public getId(): number {
		return this.id;
	}

	public setId(identificador: number) {
		this.id = identificador;
	}

	public getAlias(): string {
		return this.alias;
	}

	public setAlias(alias:string){
		this.alias = alias;
	}

	public getRaza()  : string{
		return this.raza;
	}

	public setRaza(raza:string){
		this.raza = raza;
	}

	public getFoto()  : string{
		return this.foto;	
	}

	public setFoto(foto:string){
		if (foto!=null && foto.trim()!=""){
			this.foto = foto;
		}else{
			this.foto = null;
		}
	}

	public getNumero()  : number{
		return this.numero;
	}

	public setNumero(num:number){
		this.numero = num;
	}

	public getFechaNacimiento() : Date{
		return this.fechaNacimiento;
	}

	public setFechaNacimiento(fecNac:Date){
		this.fechaNacimiento = fecNac;
	}

	public getVacunas():Array<string>{
		return this.vacunas;
	}

	public setVacunas(vacunas:Array<string>){
		this.vacunas = vacunas;
	}

	public getEnfermedades()  : Array<string>{
		return this.enfermedades;
	}

	public setEnfermedades(enf:Array<string>){
		this.enfermedades = enf;
	}

	public getAscendencia() : Array<Animal>{
		return this.ascendencia;
	}

	public setAscendencia(ascen:Array<Animal>){
		this.ascendencia = ascen;
	}

	public getDescendencia() : Array<Animal>{
		return this.descendencia;
	}

	public setDescendencia(descen:Array<Animal>){
		this.descendencia = descen;
	}

	public getPrecioCompra() : number{
		return Number(this.precioCompra);
	}

	public setPrecioCompra(precio:number){
		this.precioCompra = Number(precio);
	}

	public getPrecioVenta() : number{
		return Number(this.precioVenta);
	}

	public setPrecioVenta(precio:number){
		this.precioVenta = Number(precio);
	}

    public abstract toJSON();
    
/*	public abstract ataquePrimario();

	public abstract ataqueSecundario();

	public abstract defensaNormal();

	public abstract defensaConversion();
	*/
}