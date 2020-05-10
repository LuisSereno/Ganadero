import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {Documento} from './beans/documento';
import {Constantes} from './genericos/constantes';
import 'rxjs/add/operator/map'
import { IEDocumentoServicio } from './interfaces/documento.service.interface';
import { IEDocumento } from './beans/interfaces/documento.interface';
import { IEExplotacion } from './beans/interfaces/explotacion.interface';

//https://www.googleapis.com/storage/v1/b/ganadero-146707.appspot.com/o/gitignore_global.txt?key=AIzaSyD0Z4t-V8G6h5MbzLLz2XDqrcKIki6CIog

@Injectable()
export class DocumentoServicio implements IEDocumentoServicio {

  httpLocal: HttpClient;

  documento: IEDocumento;
  
  constructor(http: HttpClient) {
    this.httpLocal = http;
    this.documento=new Documento();
  }

  listarDocumentos(idExplotacion: number) {
    let params: HttpParams  = new HttpParams ();
    params.set('idExplotacion', idExplotacion.toString());
    params.set('key', Constantes.KEY_ID_STORAGE);
    return this.httpLocal.get(Constantes.URL_WEBSERVICES +'/ganadero/documentos', { params }).subscribe((data: any) => data.json());
  }

  guardaDocumento(explotacion: IEExplotacion): Promise<IEDocumento> {
    var url:string="/ganadero/documento/anadir";
    try{     
      return new Promise<IEDocumento>((resolve, reject) => {  
        this.httpLocal.post(Constantes.URL_WEBSERVICES +url + Constantes.PARAMETROS_KEY_POST, {documentos: [this.documento.toJSON()],idExplotacion:explotacion.id}).subscribe((data:any) => {
            this.documento.id=data.content;
            resolve(this.documento);
        },err => {
            console.error("Errr al obtener los datos del documento!");
            console.error(err);
            reject(err);
        });
    });
    }catch(ex){
      console.error(ex);
    }
  }

  obtenerURLSubida(email: string): string {
    let fichero= this.documento.metadatoFechaMod.toISOString() + "_" + email + "_" + this.documento.nombre;
    let url= Constantes.URL_STORAGE_UPDATE + "/b/" + Constantes.BUCKET_STORAGE + "/o" + Constantes.PARAMETROS_KEY_POST  + "&uploadType=media&name=" + encodeURI(fichero);
    return url;
  }
  
  obtenerURLBajada(email: string): Promise<string> {
    let fichero= this.documento.metadatoFechaMod.toISOString() + "_" + email + "_" + this.documento.nombre;
    return new Promise<string>((resolve, reject) => {  
      let url=Constantes.URL_STORAGE + "/b/" + Constantes.BUCKET_STORAGE + "/o/" + encodeURI(fichero) + Constantes.PARAMETROS_KEY_POST;
      this.httpLocal.get(url).subscribe((data:any) => {
        resolve(data.mediaLink); 
      },err => {
        console.error("Errr al obtener los datos de la venta del ganado!" + err);
        reject(err);
      });
    });
  }

  createAuthorizationHeader(headers: {} | Headers, accessToken: string): void {
    if (headers instanceof Headers){
      headers.append('x-api-key',  Constantes.KEY_ID_STORAGE);
      //headers.append('User-Agent',  'Auth0');
      headers.append('Content-Type',  'application/json');
      //headers.append('Content-Type', 'image/jpg');
    }else{
      headers['x-api-key']=  Constantes.KEY_ID_STORAGE;
      //headers['User-Agent']=  'Auth0';
      headers['Content-Type']=  'application/json';
      //headers['Content-Type']= 'image/jpg';
    }
  }


}

