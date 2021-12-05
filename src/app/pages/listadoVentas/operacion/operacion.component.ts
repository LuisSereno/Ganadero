import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/servicios/beans/compra';
import { Operacion } from 'src/app/servicios/beans/operacion';
import { Venta } from 'src/app/servicios/beans/venta';
import { Constantes } from 'src/app/servicios/genericos/constantes';
import { OperacionServicio } from 'src/app/servicios/operacion.service';

@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.scss'],
})
export class OperacionComponent implements OnInit {

  esCompra:number;

  operacion:Operacion;

  formularioOperacion: FormGroup;

  tituloOperacion:String;

  constructor(public router: Router,protected params: ActivatedRoute, protected operacionServicio: OperacionServicio,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
		this.esCompra=JSON.parse(this.params.snapshot.paramMap.get('es_compra'));
		if(this.esCompra==Constantes.COMPRA_COMPRA){
			this.operacion=new Compra(null,null,null,0,null);
      this.tituloOperacion=Constantes.COMPRA_STRING;
		}else{
			this.operacion = new Venta(null,null,null,0,null);
      this.tituloOperacion=Constantes.VENTA_STRING;
		}

    this.formularioOperacion = this.formBuilder.group({
			identificador: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			agrupacion: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			precio: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			fecha: ['value', Validators.compose([Validators.required])]
		});
  }

}
