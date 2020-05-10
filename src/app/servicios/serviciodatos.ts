import {Injectable} from '@angular/core';
//import {URLSearchParams} from '@angular/http';
import { HttpClient, HttpParams } from "@angular/common/http";
import {Explotacion} from './beans/explotacion';
import {Animal} from './beans/animal';
import {Hembra} from './beans/hembra';
import {Macho} from './beans/macho';
//import {Operacion} from './beans/operacion';
//import {Venta} from './beans/venta';
//import {Compra} from './beans/compra';
import {Usuario} from './beans/usuario';
import {Constantes} from './genericos/constantes';
import { IEAnimal } from './beans/interfaces/animal.interface';
//import {ServicioFicheros} from './servicioFicheros'

@Injectable()
export class ServicioDatos {

  private httpLocal:HttpClient;

  protected explotacion:Explotacion;

  protected usuario:Usuario;

  constructor(public authHttp: HttpClient ) {
    this.httpLocal = authHttp;
    this.explotacion=new Explotacion();
    this.usuario=new Usuario(null,null);
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
    let params: HttpParams  = new HttpParams ();
	  params.set('email', email.toString());
  	return this.httpLocal.get(Constantes.URL_WEBSERVICES + '/ganadero/usuario', { params });
  }

  public obtenerDatosGanado(idExplotacion:string){  
    console.log("entra en obtenerDatosGanado");
    let params: HttpParams  = new HttpParams ();
    params.set('idExplotacion', idExplotacion.toString());
    return this.httpLocal.get(Constantes.URL_WEBSERVICES +'/ganadero/animal', { params });
    
  }

  public obtenerDatosOperaciones(idExplotacion:string,venta:boolean){  
    console.log("entra en obtenerDatosGanado");
    let params: HttpParams  = new HttpParams ();
    let tipo:number=Constantes.COMPRA;
    if (venta){
      tipo==Constantes.VENTA;
    }
    params.set('idExplotacion', idExplotacion.toString());
    params.set('tipo',tipo.toString());
    return this.httpLocal.get(Constantes.URL_WEBSERVICES +'/ganadero/compraVenta', { params });
    
  }

  public getBusquedaAscDesc(arrayAnimales:Array<IEAnimal>|Array<string>):Array<IEAnimal>{
    var arrayResultado:Array<IEAnimal>=new Array<Animal>();

    if (arrayAnimales!=null && arrayAnimales.length>0){
      var arrayHem:Array<IEAnimal>=this.explotacion.arrayHembras;
      var arrayMach:Array<IEAnimal>=this.explotacion.arrayMachos;
      
      for (let anim of arrayAnimales){
        let arrayAux:IEAnimal;
        arrayAux = arrayHem.find(hemb =>
         +hemb.id === +(anim instanceof Animal?anim.getId():anim)
         );
        if (!arrayAux){  
          arrayAux = arrayMach.find(mach =>
           +mach.id ===  +(anim instanceof Animal?anim.getId():anim)
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
          this.explotacion.arrayHembras.push(animal);
        }else{
           console.log("Es una modificacion");
        }
      }else{
        if (guardado){
           this.explotacion.arrayMachos.push(animal);
        }else{
           console.log("Es una modificacion"); 
        }
      }
      if (guardado){
        return new Promise<Animal>((resolve, reject) => {  
          this.httpLocal.put(Constantes.URL_WEBSERVICES +url, {animales: [animal.toJSON()],idExplotacion:this.explotacion.id}).subscribe((data:any) => {
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
          this.httpLocal.post(Constantes.URL_WEBSERVICES +url, {animales: [animal.toJSON()],idExplotacion:this.explotacion.id}).subscribe((data:any) => {
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
      var usu:Usuario=new Usuario (email,nombre);
     return new Promise<Usuario>((resolve, reject) => {    
        this.httpLocal.post(Constantes.URL_WEBSERVICES +url, usu.toJSON()).subscribe((data:any) => {
          console.log("todo correcto");
          usu.id = data.content;
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
      explo.metadatoEmail = this.getUsuario().email;
      console.log(explo.toJSON());
     return new Promise<Explotacion>((resolve, reject) => {    
        this.httpLocal.post(Constantes.URL_WEBSERVICES +url, explo.toJSON()).subscribe((data:any) => {
          console.log("todo correcto");
          explo.id = data.content;
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