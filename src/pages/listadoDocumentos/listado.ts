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

	ngOnInit(){
		this.servicio.obtenerDocumentos(this.servicio.getExplotacion().getId()).subscribe(data => {
			console.log("guapito de cara");
			console.log(data);
			for (let docu of data.documentos){
				let doci:Documento=Documento.fromJSON(docu);
				this.arrayDocumentos.push(doci);
			}

		},err => {
		    console.log("Errr al obtener los datos de los Documentos!");
		});
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

}
