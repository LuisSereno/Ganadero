import {Component,ViewChild,ElementRef} from '@angular/core';
import {Documento} from '../../servicios/beans/documento'
import {Constantes} from '../../servicios/constantes';
import { NavController,Platform } from 'ionic-angular';
import {ServicioDatos} from '../../servicios/serviciodatos';
import {ServicioFicheros} from '../../servicios/servicioFicheros';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import {AuthService} from '../../servicios/auth/auth';
// Cordova
declare var cordova: any;

@Component({
  templateUrl: 'listado.html',
  providers: [Transfer, File,FileChooser,FilePath,ServicioFicheros]
})
export class ListaDocumentos {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayDocumentos: Array<Documento>;

	fileTransfer: TransferObject = this.transfer.create();

	nativepath: any;

	@ViewChild('uploadBtn') private botonSubir: ElementRef;

	@ViewChild('uploadFile') private uploadFile: ElementRef;



  	constructor(public navCtrl: NavController,public servicio: ServicioDatos,public plt: Platform,
  				private transfer: Transfer, private file: File,private fileChooser: FileChooser,
  				private filePath: FilePath,public servicioFich: ServicioFicheros,
  				public auth: AuthService) {
	}

   ionViewDidLoad() {
    	console.log("Se inicializala la pagina ionViewDidLoad cuando cambias en el menu");
		this.arrayDocumentos=new Array<Documento>();
	}

	ionViewWillEnter (){
		if (this.servicio.getExplotacion().getArrayDocumentos().length==0){
			this.llamadaServicio();
		}else{
			this.arrayDocumentos=this.servicio.getExplotacion().getArrayDocumentos();
		}
	}

	protected descargar(doc:Documento){
		this.servicioFich.setDocumento(doc);
		this.servicioFich.obtenerURLBajada(this.servicio.getUsuario().getEmail()).then(data => {
			window.open(data, '_system', 'location=yes');
		},(error)=>{
			console.log('No se puede visualizar el fichero');
			console.log(error);
			alert('No se puede visualizar el fichero');
		});
		
	}

	protected seleccionarDocumento(){
		let url="";
		 if (this.plt.is('core')) {
			this.botonSubir.nativeElement.click();
		 }else{
		   this.fileChooser.open().then((url) => {
		   		console.log("resuelve la direccion0");
		   		console.log(url);
		  		this.filePath.resolveNativePath(url).then(filePath => {
		  			console.log("resuelve la direccion1");
		  			console.log(filePath);
				    this.nativepath = filePath;
				    this.subirDocumento();
			  	}).catch(err => console.log(err));
			});
		 }
	}  

	protected insertarDatosFile(){
			let valorTextoSubida=this.botonSubir.nativeElement.value;
		 	alert(valorTextoSubida);
		 	if (valorTextoSubida) {
			    var startIndex = (valorTextoSubida.indexOf('\\') >= 0 ? valorTextoSubida.lastIndexOf('\\') : valorTextoSubida.lastIndexOf('/'));
			    var filename = valorTextoSubida.substring(startIndex);
			    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			        filename = filename.substring(1);
			    }
			   
			    if (filename){
				   	let tipoSeleccionado=filename.split(".");
		   		 	if (tipoSeleccionado[1]){
		   		 		try{
							var tipoFich=this.comparaTipoFichero(tipoSeleccionado[1].toLowerCase());
							var docu=new Documento();
				   		 	docu.setNombre(filename);
				   		 	docu.setTipo(tipoFich);
				   		 	docu.setMetaDatoFechaMod(new Date());
				   		 	docu.setMetaDatoEmail(this.servicio.getExplotacion().getUsuario().getEmail());
					 		this.guardarDocumento(docu);
		   		 		}catch(e){
		   		 			alert("El tipo seleccionado no existe");
		   		 		}
		   		 		

		   		 	}else{
		   		 		alert("El fichero no tiene formato");
		   		 	}
			    }else{
			    	alert("El fichero esta corrupto");
			    }

			}
	}

	private comparaTipoFichero(tipo:string){
		for (let valor of Constantes.ARRAY_TIPOS_DOCUMENTOS_ADMITIDOS){
			if (valor.tipo==tipo){
				return valor.contentType;
			}
		}
	}
 

	private subirDocumento() {
	    this.file.resolveLocalFilesystemUrl(this.nativepath).then(res => {
			console.log("resuelve la direccion2");
	    	console.log(res);
	    	if (res.isFile){
	    			let tipoSeleccionado=res.name.split(".");
		   		 	if (tipoSeleccionado[1]){
		   		 		try{
							var tipoFich=this.comparaTipoFichero(tipoSeleccionado[1].toLowerCase());
							var docu=new Documento();
				   		 	docu.setNombre(res.name);
				   		 	docu.setTipo(tipoFich);
				   		 	docu.setUrlMovil(this.nativepath);
				   		 	docu.setMetaDatoFechaMod(new Date());
				   		 	docu.setMetaDatoEmail(this.servicio.getExplotacion().getUsuario().getEmail());
				   		 	this.servicioFich.setDocumento(docu);
				   		 	let valorCabeceras={};
				   		 	ServicioFicheros.createAuthorizationHeader(valorCabeceras);
					 		this.servicioFich.guardaDocumento(this.servicio.getExplotacion()).then(dataDoc => {						  
							 let options: FileUploadOptions = {
							     headers: {'Content-Type': docu.getTipo()}
							     		   //'Authorization': 'Bearer ' + this.auth.accessToken
							  }
							  console.log("El header es")
							  console.log(options);							
							  this.fileTransfer.upload(res.nativeURL, this.servicioFich.obtenerURLSubida(this.servicio.getUsuario().getEmail()),options).then((data) => {

								alert("El fichero se ha subido correctamente");
								this.servicio.getExplotacion().getArrayDocumentos().push(dataDoc);
							}, (error) => {
								console.log('No se puede guardar el fichero');
								console.log(error);
								if (error.http_status==401){
									alert("El fichero ya existe");
								}else{
									alert("No se ha podido almacenar el documento");
								}								
							});
							},err => {
							  console.log("Errr al guardar el documento!");
							  alert("No se ha podido guardar el documento");
							});
		   		 		}catch(e){
		   		 			alert("El tipo seleccionado no existe");
		   		 		}
		   		 		

		   		 	}else{
		   		 		alert("El fichero no tiene formato");
		   		 	}

				
	    	}

	    })
	  }


	private guardarDocumento(doc:Documento){
		this.servicioFich.setDocumento(doc);
		let correcto=this.servicioFich.guardaDocumento(this.servicio.getExplotacion());

		if(correcto){
			alert("Guardado Correcto");
		}else{
		    alert("Error al modificar");
		};
	}


	private llamadaServicio(){
		this.servicioFich.listarDocumentos(this.servicio.getExplotacion().getId()).subscribe(data => {
			var aux=new Array<Documento>();
			for (let docu of data.documentos){
				let doci:Documento=Documento.fromJSON(docu);
				aux.push(doci);
			}
			this.servicio.getExplotacion().setArrayDocumentos(aux);
			this.arrayDocumentos=this.servicio.getExplotacion().getArrayDocumentos();
		},err => {
			console.error(err);
		    console.log("Errr al obtener los datos de los Documentos!");
		});
	}

	public obtenerTipoFicheroHtml(tipoDocumento:string){
		for (let valor of Constantes.ARRAY_TIPOS_DOCUMENTOS_ADMITIDOS){
			if (valor.contentType==tipoDocumento){
				return valor.imagen;
			}
		}		
	}
}
