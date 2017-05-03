import {Injectable} from '@angular/core';
import {URLSearchParams,Http} from '@angular/http';
import {Explotacion} from './beans/explotacion';
import {Animal} from './beans/animal';
import {Hembra} from './beans/hembra';
import {Macho} from './beans/macho';

@Injectable()
export class ServicioDatos {

  private httpLocal:Http;

  protected explotacion:Explotacion;

  constructor(http: Http /* This is #2 */ ) {
    this.httpLocal = http;
    this.explotacion=new Explotacion();
  }

  public obtenerDatosExplotacion(email:String){
    console.log("entra en obtenerDatosExpltotacion");
  	let params: URLSearchParams = new URLSearchParams();
	  params.set('usuario', email.toString());
  	this.httpLocal.get('src/assets/datos/explotacion.json', { search: params }).map(res => res.json()).subscribe(data => {
       Object.assign(this.explotacion,data) ;
       console.log(this.explotacion);
    });
  }

  public obtenerDatosGanado(idExplotacion:number){  
    console.log("entra en obtenerDatosGanado");
    let params: URLSearchParams = new URLSearchParams();
    params.set('idGanado', idExplotacion.toString());
    return this.httpLocal.get('src/assets/datos/ganado.json', { search: params }).map(res => res.json());
    
  }

  public getExplotacion(){
    return this.explotacion;
  }

  public getBusquedaAscDesc(arrayAnimales:Array<Animal>):Array<Animal>{
    var arrayResultado:Array<Animal>=new Array<Animal>();

    if (arrayAnimales!=null && arrayAnimales.length>0){
      var arrayHem:Array<Hembra>=this.explotacion.getArrayHembras();
      var arrayMach:Array<Macho>=this.explotacion.getArrayMachos();
      
      for (let id of arrayAnimales){
        let arrayAux:Array<Animal>=new Array<Animal>();
        arrayAux = arrayHem.filter(hemb =>
         +hemb.getId() === +id
         );
        arrayResultado.concat(arrayResultado);
        arrayAux = arrayMach.filter(mach =>
         +mach.getId() ===  +id
         );
        arrayResultado=arrayResultado.concat(arrayAux);
      }
    }
    
    return arrayResultado;
  }
  
  public guardaModificaAnimal(guardado:boolean,animal:Animal):boolean{
    var guardadoCorrecto:boolean=false;
    var url:string="";
    if (guardado){
      url="src/assets/datos/ganado.json";
    }else{
      url="src/assets/datos/ganado.json";
    }
    try{
      this.httpLocal.post(url, {animal: animal.toJSON(),idExplotacion:this.explotacion.getId()}).map(res => res.json());
      if(animal instanceof Hembra){
        this.explotacion.getArrayHembras().push(animal);
      }else{
        this.explotacion.getArrayMachos().push(animal);
      }
      guardadoCorrecto=true;
    }catch(ex){
      console.log(ex);
    }
    return guardadoCorrecto;
  }

}