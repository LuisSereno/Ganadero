import {Component} from '@angular/core';
import {Documento} from '../../servicios/beans/documento'
import {Constantes} from '../../servicios/constantes';
import { NavController } from 'ionic-angular';
import {ServicioDatos} from '../../servicios/serviciodatos';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

// Cordova
declare var cordova: any;

@Component({
  templateUrl: 'listado.html',
  providers: [Transfer, File]
})
export class ListaDocumentos {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayDocumentos: Array<Documento>;

	fileTransfer: TransferObject = this.transfer.create();

  	constructor(public navCtrl: NavController,public servicio: ServicioDatos,
  				private transfer: Transfer, private file: File) {

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

/*	  this.fileTransfer.download(doc.getUrl(), cordova.file.externalRootDirectory + doc.getNombre() + "." + doc.getTipo()).then((entry) => {
	    console.log('download complete: ' + entry.toURL());
	  }, (error) => {
	    // handle error
	    console.log('No se puede descargar el fichero');
	    console.log(error);
	  }); 
*/
	  this.fileTransfer.download(doc.getUrl(), this.file.dataDirectory + doc.getNombre() + "." + doc.getTipo()).then((entry) => {
	    console.log('download complete: ' + entry.toURL());
	  }, (error) => {
	    console.log('No se puede descargar el fichero');
	    console.log(error);
	  });

	}

}
