import {Operacion} from './operacion';
import {Animal} from './animal';

export class Compra extends Operacion{

	constructor(id:number,agru:string,animales:Array<Animal>,pCompra:number,fecha:Date){
		super();
		this.setId(id);
		this.setAgrupacion(agru);
		this.setAnimales(animales);
		this.setPrecio(pCompra);
		this.setFecha(fecha);
	}

}