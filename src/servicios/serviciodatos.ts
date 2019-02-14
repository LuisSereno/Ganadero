import {Injectable} from '@angular/core';
//import {URLSearchParams} from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import {Explotacion} from './beans/explotacion';
import {Animal} from './beans/animal';
import {Hembra} from './beans/hembra';
import {Macho} from './beans/macho';
//import {Operacion} from './beans/operacion';
//import {Venta} from './beans/venta';
//import {Compra} from './beans/compra';
import {Usuario} from './beans/usuario';
import {Constantes} from './constantes';
import 'rxjs/add/operator/map'
//import {ServicioFicheros} from './servicioFicheros'

@Injectable()
export class ServicioDatos {

  private httpLocal:AuthHttp;

  protected explotacion:Explotacion;

  protected usuario:Usuario;

  constructor(public authHttp: AuthHttp ) {
    this.httpLocal = authHttp;
    this.explotacion=new Explotacion();
    this.usuario=new Usuario();
  }

  public getExplotacion(){
    return this.explotacion;
  }

  public setExplotacion(explo:Explotacion){
    return this.explotacion=explo;
  }

   public getUsuario(){
    return this.usuario;
  }

  public setUsuario(usu:Usuario){
    return this.usuario=usu;
  }
  public obtenerDatosExplotacion(email:string,accessToken:string){
    console.log("entra en obtenerDatosExpltotacion");
  	let params: URLSearchParams = new URLSearchParams();
	  params.set('email', email.toString());
  	return this.httpLocal.get(Constantes.URL_WEBSERVICES + '/ganadero/usuario', { search: params }).map(res => res.json());
  }

  public obtenerDatosGanado(idExplotacion:number){  
    console.log("entra en obtenerDatosGanado");
    let params: URLSearchParams = new URLSearchParams();
    params.set('idExplotacion', idExplotacion.toString());
    return this.httpLocal.get(Constantes.URL_WEBSERVICES +'/ganadero/animal', { search: params }).map(res => res.json());
    
  }

  public obtenerDatosOperaciones(idExplotacion:number,venta:boolean){  
    console.log("entra en obtenerDatosGanado");
    let params: URLSearchParams = new URLSearchParams();
    let tipo:number=Constantes.COMPRA;
    if (venta){
      tipo==Constantes.VENTA;
    }
    params.set('idExplotacion', idExplotacion.toString());
    params.set('tipo',tipo.toString());
    return this.httpLocal.get(Constantes.URL_WEBSERVICES +'/ganadero/compraVenta', { search: params }).map(res => res.json());
    
  }

  public getBusquedaAscDesc(arrayAnimales:Array<Animal>|Array<number>):Array<Animal>{
    var arrayResultado:Array<Animal>=new Array<Animal>();

    if (arrayAnimales!=null && arrayAnimales.length>0){
      var arrayHem:Array<Hembra>=this.explotacion.getArrayHembras();
      var arrayMach:Array<Macho>=this.explotacion.getArrayMachos();
      
      for (let anim of arrayAnimales){
        let arrayAux:Animal;
        arrayAux = arrayHem.find(hemb =>
         +hemb.getId() === +(anim instanceof Animal?anim.getId():anim)
         );
        if (!arrayAux){  
          arrayAux = arrayMach.find(mach =>
           +mach.getId() ===  +(anim instanceof Animal?anim.getId():anim)
           );
          if (arrayAux){  
            arrayResultado.push(arrayAux);
          }
        }else{
           arrayResultado.push(arrayAux);
        }

      }
    }
    
    return arrayResultado;
  }
  
  public guardaModificaAnimal(guardado:boolean,animal:Animal):Promise<Animal>{
    var url:string="/ganadero/animal";

    try{     
      if(animal instanceof Hembra){
        if (guardado){
          this.explotacion.getArrayHembras().push(animal);
        }else{
           console.log("Es una modificacion");
        }
      }else{
        if (guardado){
           this.explotacion.getArrayMachos().push(animal);
        }else{
           console.log("Es una modificacion"); 
        }
      }
      if (guardado){
        return new Promise<Animal>((resolve, reject) => {  
          this.httpLocal.put(Constantes.URL_WEBSERVICES +url, {animales: [animal.toJSON()],idExplotacion:this.explotacion.getId()}).map(res => res.json()).subscribe(data => {
            console.log("todo correcto");
            animal.setId(data.content);
            resolve(animal);
          },err => {
              console.error("Errr al obtener los datos del ganado!");
              console.error(err);
              reject(err);
          });
        });
      }else{
        return new Promise<Animal>((resolve, reject) => {
          this.httpLocal.post(Constantes.URL_WEBSERVICES +url, {animales: [animal.toJSON()],idExplotacion:this.explotacion.getId()}).map(res => res.json()).subscribe(data => {
            console.log("todo correcto");
            resolve(animal);
          },err => {
              console.error("Errr al obtener los datos del ganado!");
              console.error(err);
              reject(err);
          });
        });
      }
     
    }catch(ex){
      console.log(ex);
    }
  }


public guardaUsuario(nombre:string,email:string):Promise<Usuario>{
    var url:string="/ganadero/usuario";
    try{ 
      var usu:Usuario=new Usuario ();
      usu.setEmail(email);
      usu.setNombre(nombre);
     return new Promise<Usuario>((resolve, reject) => {    
        this.httpLocal.post(Constantes.URL_WEBSERVICES +url, usu.toJSON()).map(res => res.json()).subscribe(data => {
          console.log("todo correcto");
          usu.setId(data.content);
          resolve(usu);
        },err => {
            console.error("Errr al obtener los datos del documento!");
            console.error(err);
            reject(err);
        });
    });
    }catch(ex){
      console.log(ex);

    }

  }


public guardaExplotacion(explo:Explotacion):Promise<Explotacion>{
    var url:string="/ganadero/explotacion";
    try{ 
      console.log("JSON DE LA EXPLOTACION");
      explo.setMetaDatoEmail(this.getUsuario().getEmail());
      console.log(explo.toJSON());
     return new Promise<Explotacion>((resolve, reject) => {    
        this.httpLocal.post(Constantes.URL_WEBSERVICES +url, explo.toJSON()).map(res => res.json()).subscribe(data => {
          console.log("todo correcto");
          explo.setId(data.content);
          resolve(explo);
        },err => {
            console.error("Errr al obtener los datos del documento!");
            console.error(err);
            reject(err);
        });
    });
    }catch(ex){
      console.log(ex);

    }

  }

}