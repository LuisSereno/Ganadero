import {Component,ViewChild,ElementRef} from '@angular/core';
import {Documento} from '../../servicios/beans/documento'
import {Constantes} from '../../servicios/constantes';
import { NavController,Platform } from 'ionic-angular';
import {ServicioDatos} from '../../servicios/serviciodatos';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
// Cordova
declare var cordova: any;

@Component({
  templateUrl: 'listado.html',
  providers: [Transfer, File,FileChooser,FilePath]
})
export class ListaDocumentos {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayDocumentos: Array<Documento>;

	fileTransfer: TransferObject = this.transfer.create();

	nativepath: any;

	@ViewChild('uploadBtn') private botonSubir: ElementRef;

	@ViewChild('uploadFile') private uploadFile: ElementRef;

  	constructor(public navCtrl: NavController,public servicio: ServicioDatos,public plt: Platform,
  				private transfer: Transfer, private file: File,private fileChooser: FileChooser,private filePath: FilePath) {

		this.arrayDocumentos=new Array<Documento>();
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

	protected visualizar(doc:Documento){
		window.open(doc.getUrl(), '_system', 'location=yes');
	}



	protected descargar(doc:Documento) {

	  this.fileTransfer.download(doc.getUrl(), this.file.dataDirectory + doc.getNombre() + "." + doc.getTipo()).then((entry) => {
	    console.log('download complete: ' + entry.toURL());
	  }, (error) => {
	    console.log('No se puede descargar el fichero');
	    console.log(error);
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
				    this.readimage();
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
				   		 	docu.setUrl("/guanchuncito");
				   		 	docu.setMetaDatoFechaMod(new Date());
				   		 	docu.setMetaDatoEmail(this.servicio.getExplotacion().getEmailUsu());
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
		if (tipo==Constantes.FICHEROADMINITOJPG){
			return Constantes.TIPODOCUMENTOIMAGEN;
		}else if (tipo==Constantes.FICHEROADMINITOPNG){
			return Constantes.TIPODOCUMENTOIMAGEN;
		}else if (tipo==Constantes.FICHEROADMINITOJPEG){
			return Constantes.TIPODOCUMENTOIMAGEN;
		}else if (tipo==Constantes.FICHEROADMINITOTIF){
			return Constantes.TIPODOCUMENTOIMAGEN;
		}else if (tipo==Constantes.FICHEROADMINITOTIFF){
			return Constantes.TIPODOCUMENTOIMAGEN;
		}else if (tipo==Constantes.FICHEROADMINITOPDF){
			return Constantes.TIPODOCUMENTOPDF;
		}else if (tipo==Constantes.FICHEROADMINITODOCX){
			return Constantes.TIPODOCUMENTOWORD;
		}else if (tipo==Constantes.FICHEROADMINITODOC){
			return Constantes.TIPODOCUMENTOWORD;
		}else if (tipo==Constantes.FICHEROADMINITORTF){
			return Constantes.TIPODOCUMENTOWORD;
		}else if (tipo==Constantes.FICHEROADMINITOTXT){
			return Constantes.TIPODOCUMENTOWORD;
		}else if (tipo==Constantes.FICHEROADMINITOXLSX){
			return Constantes.TIPODOCUMENTOEXCEL;
		}else if (tipo==Constantes.FICHEROADMINITOXLS){
			return Constantes.TIPODOCUMENTOEXCEL;
		}else if (tipo==Constantes.FICHEROADMINITOXML){
			return Constantes.TIPODOCUMENTOEXCEL;
		}
	}
 

	private readimage() {
	    this.file.resolveLocalFilesystemUrl(this.nativepath).then(res => {
			console.log("resuelve la direccion2");
	    	console.log(res);
	    	if (res.isFile){
				this.fileTransfer.upload(res.fullPath, this.file.dataDirectory + res.name).then((data) => {
					console.log('upload complete: ');
					console.log(data);
				}, (error) => {
					console.log('No se puede cargar el fichero');
					console.log(error);
				});
	    	}

	    })
	  }


	private guardarDocumento(doc:Documento){
		let correcto=this.servicio.guardaDocumento(doc);

		if(correcto){
			alert("Guardado Correcto");
		}else{
		    alert("Error al modificar");
		};
	}


	private llamadaServicio(){
		this.servicio.obtenerDocumentos(this.servicio.getExplotacion().getId()).subscribe(data => {
			for (let docu of data.documentos){
				let doci:Documento=Documento.fromJSON(docu);
				this.arrayDocumentos.push(doci);
			}
			this.servicio.getExplotacion().setArrayDocumentos(this.arrayDocumentos);
		},err => {
		    console.log("Errr al obtener los datos de los Documentos!");
		});
	}

}
