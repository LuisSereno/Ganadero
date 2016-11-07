import {Component} from '@angular/core';
import {Documento} from '../../servicios/beans/documento'
import {Constantes} from '../../servicios/constantes';

@Component({
  templateUrl: 'listado.html'
})
export class ListaDocumentos {

	//Este valor dependera de lo que seas tu, asi se te mostrara el primero
	arrayDocumentos: Array<Documento>;

  	constructor() {

		let doc1:Documento = new Documento();
		doc1.setId(1);
		doc1.setNombre("luis.word");
		doc1.setUrl("/hola/holitaMou");
		doc1.setTipo(Constantes.TIPODOCUMENTOWORD);
		doc1.setFechaAlta(new Date());
		let doc2:Documento = new Documento();
		doc2.setId(1);
		doc2.setNombre("maria.excel");
		doc2.setUrl("/hola/holitaMou/excel");
		doc2.setTipo(Constantes.TIPODOCUMENTOEXCEL);
		doc2.setFechaAlta(new Date());
		let doc3:Documento = new Documento();
		doc3.setId(1);
		doc3.setNombre("alberto.gimp");
		doc3.setUrl("/hola/holitaMou/envida");
		doc3.setTipo(Constantes.TIPODOCUMENTOIMAGEN);
		doc3.setFechaAlta(new Date());
		let doc4:Documento = new Documento();
		doc4.setId(1);
		doc4.setNombre("nochebuena.pdf");
		doc4.setUrl("/hola/holitaMou/nuevamejoramiga");
		doc4.setTipo(Constantes.TIPODOCUMENTOPDF);
		doc4.setFechaAlta(new Date());

		this.arrayDocumentos=[doc1,doc2,doc3,doc4];
	}
}
