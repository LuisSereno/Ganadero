//Fichero de constantes

export class Constantes{

public static FOTO_ANIMAL_DEFECTO:string ="assets/img/vaca.png";

public static FOTO_ANIMAL_MACHO_DEFECTO:string ="assets/img/toro.png";

public static MACHO = 1; 

public static HEMBRA = 0; 

public static KEY_ID_STORAGE = "AIzaSyD0Z4t-V8G6h5MbzLLz2XDqrcKIki6CIog";

public static PARAMETROS_KEY_POST= "?key="+ Constantes.KEY_ID_STORAGE;

public static URL_STORAGE="https://www.googleapis.com/storage/v1"

public static URL_STORAGE_UPDATE="https://www.googleapis.com/upload/storage/v1"

public static BUCKET_STORAGE="ganadero-146707.appspot.com"

public static AUTH0_CLIENT_ID = "pYEZiVRhnq7oYS6uhbLAQ57sep58v7sJ";

public static AUTH0_DOMAIN = "sereno.eu.auth0.com";

public static AUTH0_PACKAGEIDENTIFIER = "com.serenapp.ganadero";

public static URL_WEBSERVICES="https://ganadero-146707.appspot.com/_ah/api/ganadero/v1"
//public static URL_WEBSERVICES=""

public static COMPRA = 1; 

public static VENTA = 2; 

public static VENTA_VENDER = 3; 

public static COMPRA_COMPRA = 4; 

public static INDEFINIDO = 0; 

public static ARRAY_TIPOS_DOCUMENTOS_ADMITIDOS=[{"contentType":"image/png","tipo":"png","imagen":"img"},{"contentType":"image/jpg","tipo":"jpg","imagen":"img"},
{"contentType":"image/jpeg","tipo":"jpeg","imagen":"img"},{"contentType":"image/tiff","tipo":"tif","imagen":"img"},{"contentType":"application/pdf","tipo":"pdf","imagen":"pdf"},
{"contentType":"application/msword","tipo":"docx","imagen":"word"},{"contentType":"application/msword","tipo":"doc","imagen":"word"}, {"contentType":"application/rtf","tipo":"rtf","imagen":"word"},
{"contentType":"text/plain","tipo":"plain","imagen":"word"},{"contentType":"application/vnd.ms-excel","tipo":"xlsx","imagen":"excel"},{"contentType":"application/vnd.ms-excel","tipo":"xls","imagen":"excel"},
{"contentType":"application/xml","tipo":"xml","imagen":"excel"}];


public static AUTH_CONFIG = {
    // needed for auth0
    clientID: Constantes.AUTH0_CLIENT_ID,
  
    // needed for auth0cordova
    clientId: Constantes.AUTH0_CLIENT_ID,
    domain: Constantes.AUTH0_DOMAIN,
    callbackURL: location.href,
    packageIdentifier: Constantes.AUTH0_PACKAGEIDENTIFIER,
    audience: 'https://sereno.eu.auth0.com/api/v2/',
  };

  public static prefixDatabaseProject = "serenapp/ganadero/";


}

