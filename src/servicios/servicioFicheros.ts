import {Injectable} from '@angular/core';
import {URLSearchParams,Http,Headers} from '@angular/http';
import {Documento} from './beans/documento';
import {Explotacion} from './beans/explotacion';
import {Constantes} from './constantes';
import 'rxjs/add/operator/map'


//https://www.googleapis.com/storage/v1/b/ganadero-146707.appspot.com/o/gitignore_global.txt?key=AIzaSyD0Z4t-V8G6h5MbzLLz2XDqrcKIki6CIog

@Injectable()
export class ServicioFicheros {

  private httpLocal:Http;

  protected documento:Documento;

  constructor(http: Http /* This is #2 */ ) {
    this.httpLocal = http;
    this.documento=new Documento();
  }

  public getDocumento(){
    return this.documento;
  }

  public setDocumento(docu:Documento){
    return this.documento=docu;
  }

  public listarDocumentos(idExplotacion:number){  
    console.log("entra en obtenerDatosGanado");
    let params: URLSearchParams = new URLSearchParams();
    params.set('idExplotacion', idExplotacion.toString());
    params.set('key', Constantes.KEY_ID_STORAGE);
    return this.httpLocal.get(Constantes.URL_WEBSERVICES +'/ganadero/documentos/obtener', { search: params }).map(res => res.json());
  }

  public guardaDocumento(explotacion:Explotacion):Promise<Documento>{
    var url:string="/ganadero/documento/anadir";
    try{     
      console.log(this.documento.toJSON());
      return new Promise<Documento>((resolve, reject) => {  
        this.httpLocal.post(Constantes.URL_WEBSERVICES +url + Constantes.PARAMETROS_KEY_POST, {documentos: [this.documento.toJSON()],idExplotacion:explotacion.getId()}).map(res => res.json()).subscribe(data => {
            console.log("todo correcto");
            this.documento.setId(data.content);
            resolve(this.documento);
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

  public obtenerURLSubida(email:string){
    //  let fichero="gitignore_global.txt";
    //  params= new URLSearchParams();
    //  params.set('key', Constantes.KEY_ID_STORAGE);
    //  return this.httpLocal.get(Constantes.URL_STORAGE + "/b/" + Constantes.BUCKET_STORAGE + /o/ + fichero, { search: params }).map(res => res.json());
    let fichero= this.documento.getMetaDatoFechaMod().toISOString() + "_" + email + "_" + this.documento.getNombre();
    let url= Constantes.URL_STORAGE_UPDATE + "/b/" + Constantes.BUCKET_STORAGE + "/o" + Constantes.PARAMETROS_KEY_POST  + "&uploadType=media&name=" + encodeURI(fichero);
    console.log("URL LOCA SERENO: " + url);
    return url;
    //return Constantes.URL_STORAGE_UPDATE + "/b/" + Constantes.BUCKET_STORAGE + "/o"  + "?uploadType=media&name=" + fichero;
  }

  public obtenerURLBajada(email:string):Promise<string>{
    let fichero= this.documento.getMetaDatoFechaMod().toISOString() + "_" + email + "_" + this.documento.getNombre();
    return new Promise<string>((resolve, reject) => {  
      let url=Constantes.URL_STORAGE + "/b/" + Constantes.BUCKET_STORAGE + "/o/" + encodeURI(fichero) + Constantes.PARAMETROS_KEY_POST;
      this.httpLocal.get(url).map(res => res.json()).subscribe(data => {
        resolve(data.mediaLink); 
      },err => {
        console.log("Errr al obtener los datos de la venta del ganado!" + err);
        reject(err);
      });
    });
  }


  public static createAuthorizationHeader(headers: Headers|{} ) {
    if (headers instanceof Headers){
      headers.append('Authorization', 'Bearer ' + Constantes.KEY_ID_STORAGE);
      headers.append('Content-Type', 'image/jpg');
    }else{
      headers['Authorization']= 'Bearer ' + Constantes.KEY_ID_STORAGE;
      headers['Content-Type']= 'image/jpg';
    }

  }

}

