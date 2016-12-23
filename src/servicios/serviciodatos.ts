import {Injectable} from '@angular/core';
import {URLSearchParams,Http} from '@angular/http';
import {Explotacion} from './beans/explotacion';

@Injectable() /* This is #1 */
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
  	this.httpLocal.get('../../assets/datos/explotacion.json', { search: params }).map(res => res.json()).subscribe(data => {
       Object.assign(this.explotacion,data) ;
       console.log(this.explotacion);
    });
  }

    public obtenerDatosGanado(idExplotacion:number){
    console.log("entra en obtenerDatosGanado");
    let params: URLSearchParams = new URLSearchParams();
    params.set('idGanado', idExplotacion.toString());
    this.httpLocal.get('../../assets/datos/explotacion.json', { search: params }).map(res => res.json()).subscribe(data => {
       Object.assign(this.explotacion,data) ;
       console.log(this.explotacion);
    });
  }

  public getExplotacion(){
    return this.explotacion;
  }
  
}