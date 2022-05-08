import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/servicios/beans/compra';
import { Hembra } from 'src/app/servicios/beans/hembra';
import { IEAnimal } from 'src/app/servicios/beans/interfaces/animal.interface';
import { IEIdentification } from 'src/app/servicios/beans/interfaces/identification.interface';
import { Macho } from 'src/app/servicios/beans/macho';
import { Operacion } from 'src/app/servicios/beans/operacion';
import { Venta } from 'src/app/servicios/beans/venta';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { Constantes } from 'src/app/servicios/genericos/constantes';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';
import { OperacionServicio } from 'src/app/servicios/operacion.service';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { GanadoServicio } from 'src/app/servicios/ganado.service';
import { Explotacion } from 'src/app/servicios/beans/explotacion';
import { IEOperacion } from 'src/app/servicios/beans/interfaces/operacion.interface';

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

  tipoMostrado: string = "hembras";

  arrayHembras: Array<IEAnimal>;

  arrayMachos: Array<IEAnimal>;

  isDetail:boolean = false;

  public submitAttempt: boolean = false;

  constructor(public router: Router,protected params: ActivatedRoute, protected operacionServicio: OperacionServicio,
    private formBuilder: FormBuilder, private toastCtrl: ToastService, public explotacionServ: ExplotacionServicio,
    private location: Location,private platform: Platform,public ganadoServicio: GanadoServicio) {
    }

  ngOnInit() {
    this.submitAttempt = false;
		this.esCompra=JSON.parse(this.params.snapshot.paramMap.get('es_compra'));
    if (this.operacionServicio.operacionSeleccionada!=null){
      this.operacion=this.operacionServicio.operacionSeleccionada;
      this.isDetail=true;
    }
		if(this.esCompra==Constantes.COMPRA_COMPRA){
      if (!this.isDetail)this.operacion=new Compra(null,null,null,0,null);
      this.tituloOperacion=Constantes.COMPRA_STRING;
		}else{
      if(!this.isDetail)this.operacion=new Venta(null,null,null,0,null);
      this.tituloOperacion=Constantes.VENTA_STRING;
		}
    if (!this.isDetail){
      this.operacionServicio.operacionSeleccionada=this.operacion;
    }

    this.formularioOperacion = this.formBuilder.group({
			identificador: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			agrupacion: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			precio: ['value', Validators.compose([Validators.required, Validators.minLength(1), Validators.required, Validators.maxLength(25)])],
			fecha: ['value', Validators.compose([Validators.required])]
		});

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('platform.backButton was called!');
      this.operacionServicio.operacionSeleccionada=null;
    });

  }

  ngOnDestroy(){
    console.debug('ngOnDestroy was called!');
    this.operacionServicio.operacionSeleccionada=null;
  }

  ionViewWillEnter(){
    console.debug('ionViewWillEnter was called!');
    if (this.isDetail){
      this.ganadoServicio.obtenerDatosGanadoIds(this.operacion.arrayIdAnimales)
      .then((data:IEAnimal[]) => {
        this.operacion.animales=new Array<IEAnimal>();
        for(let animal of data){
          if(animal){
            if (animal.sexo==Constantes.MACHO){
              this.operacion.animales.push(Macho.fromJSON(animal));
            }else{
              this.operacion.animales.push(Hembra.fromJSON(animal));
            }
          }
        }
        this.clasificarAnimalesOperacion();
      })
      .catch(e=>console.error("Animales no encontrados",e));
    }else{
      this.clasificarAnimalesOperacion();
    }
  }
  ionViewDidEnter(){
    console.debug('ionViewDidEnter was called!');

  }
  ionViewWillLeave(){
    console.debug('ionViewWillLeave was called!');

  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave was called!');

  }

  private clasificarAnimalesOperacion(){

    this.arrayHembras = new Array<Hembra>();
    this.arrayMachos =  new Array<Macho>();

    if (this.operacion.animales != null){
      this.arrayHembras = this.operacion.animales.filter(anim => anim instanceof Hembra);

      this.arrayMachos = this.operacion.animales.filter(anim => anim instanceof Macho);
    }

  }

  guardarOperacion(){
    if (!this.submitAttempt){
      if (this.formularioOperacion.valid){
        this.submitAttempt=true;
        //primero guardamos los animales
        //despues guardamos la operacion
        //al final actualizamos la explotacion
        this.guardarAnimales();
      } else {
        this.toastCtrl.push("Faltan campos por rellenar", "WARNING");
      }
    }
  }

  private updatedOPeration() {
    if(this.esCompra==Constantes.COMPRA_COMPRA){
      // removemos los animales de los animales que tiene la granja
      console.log("va a añadir una compra");
      let operacionCompra:Compra=Compra.fromJSON(this.operacion);
      this.operacion=operacionCompra.toJSON() as Operacion;

    }else{
      //anadimos animales a los que ya tenga la granja
      console.log("va a añadir una venta");
      let operacionVenta:Venta=Venta.fromJSON(this.operacion);
      this.operacion=operacionVenta.toJSON() as Operacion;
    }
    this.operacionServicio.anadirOperacion(this.operacion).then(data => {
      this.operacion.id = data.id;
      this.updateExplotacion(data);
    }, err => {
      console.error("Errr al guardar los datos de la operacion!", err);
      this.toastCtrl.push("Error al guardar", "ERROR");
    }).catch(err => {
      console.error("Errr al guardar los datos de la operacion!", err);
      this.toastCtrl.push("Error al guardar", "ERROR");
    }).finally(() => {
      this.submitAttempt = true;
    });
  }

  private updateExplotacion(data: IEOperacion) {
    let explo = this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada);
    if (explo.arrayIdOperaciones == null) {
      explo.arrayIdOperaciones = new Array<IEIdentification>();
    }
    explo.arrayIdOperaciones.push({ id: data.id });
    explo.dineroAnual+=data.precio;
    explo.dineroTotal+=data.precio;
    this.explotacionServ.actualizarExplotacion(Explotacion.fromJSON(explo)).then(data => {
      this.vaciarFormulario();
      this.toastCtrl.push("Guardado correcto", "CORRECTO");
      this.operacionServicio.operacionSeleccionada = null;
      this.volver();
    }).catch(err => {
      throw new Error("Imposible sincronizar datos de la operacion con la explotacion: " + err);
      this.submitAttempt = false;
    });
  }

  private guardarAnimales(){
    let error:boolean=false;
    let index:number=0;
    let promise:Promise<Boolean>=new Promise((resolve, reject) => {
      if (this.operacion.animales!=null && this.operacion.animales.length>0){
        for (let animal of this.operacion.animales){
          animal.fechaOperacion= new Date();
          if(this.esCompra==Constantes.COMPRA_COMPRA){
            // removemos los animales de los animales que tiene la granja
            guardarCompra(this.ganadoServicio,this.operacion,this.explotacionServ,this.toastCtrl,animal);

          }else{
            guardarVenta(this.ganadoServicio, this.operacion,this.toastCtrl, animal);
          }
        }
      }else{
        resolve(false);
      }


      function guardarVenta(ganadoServicio:GanadoServicio, operacion:Operacion,toastCtrl:ToastService,animal: IEAnimal) {
        if (!operacion.arrayIdAnimales) {
          operacion.arrayIdAnimales = new Array<IEIdentification>();
        }
        operacion.arrayIdAnimales.push({ id: animal.id });
        animal.baja=true;
        ganadoServicio.actualizarAnimal(animal, false).then(data => {
          console.log("animal actualizado", data);
          index += 1;
          if (index == operacion.animales.length) {
            let operacionCompra: Venta = Venta.fromJSON(operacion);
            operacion = operacionCompra.toJSON() as Operacion;
            resolve(true);
          }
        }).catch(err => {
          error = true;
          console.error("Errr al guardar los datos del animal!", err);
          toastCtrl.push("EWARNINGrror al guardar", "ERROR");
          resolve(false);
        });
      }

      function guardarCompra(ganadoServicio:GanadoServicio, operacion:Operacion,explotacionServ:ExplotacionServicio,toastCtrl:ToastService,animal: IEAnimal) {
        console.log("va a añadir animales a la explotacion en  una compra");
        ganadoServicio.guardaAnimal(animal).then(data => {
          animal.id = data.id;
          if (!operacion.arrayIdAnimales) {
            operacion.arrayIdAnimales = new Array<IEIdentification>();
          }
          operacion.arrayIdAnimales.push({ id: data.id });
          ganadoServicio.ganado.push(data);
          let explo: Explotacion = new Explotacion().fromJSON(explotacionServ.encontrarExplotacion({ id: explotacionServ.explotacionSeleccionada.id }));
          if (!explo.arrayIdAnimales) {
            explo.arrayIdAnimales = new Array<IEIdentification>();
          }
          explo.arrayIdAnimales.push({ id: data.id });
          //Si es una compra, no va a tener descendencia ni ascendencia
          //this.actualizarDatosAscendencia();
          index += 1;
          if (index == operacion.animales.length) {
            explotacionServ.actualizarExplotacion(explo).then(data => {
              let operacionCompra: Compra = Compra.fromJSON(operacion);
              operacion = operacionCompra.toJSON() as Operacion;
              resolve(true);
            }).catch(err => { throw new Error("Imposible sincronizar datos del animal con la explotacion: " + err); error = true; resolve(false); });
          }
        }, err => {
          error = true;
          console.error("Errr al guardar los datos del animal!", err);
          toastCtrl.push("Error al guardar", "ERROR");
          resolve(false);
        }).catch(err => {
          error = true;
          console.error("Errr al guardar los datos del animal!", err);
          toastCtrl.push("EWARNINGrror al guardar", "ERROR");
          resolve(false);
        });
      }
    });

    promise.then(doUpdate=>{
      if (doUpdate){
        this.updatedOPeration();
      }else{
        this.submitAttempt = false;
      }
    });

  }

  protected vaciarFormulario() {
		if(this.esCompra==Constantes.COMPRA_COMPRA){
			this.operacion=new Compra(null,null,null,0,null);
		}else{
			this.operacion = new Venta(null,null,null,0,null);
		}
	}

	protected volver() {
		this.location.back();
	}

  borrarOperacion(){
    var strCallback = () : void => {
      if (this.operacion.id!=null && this.operacion.id.trim()!=""){
        this.toastCtrl;
        if (this.operacion.tipo==Constantes.COMPRA){
          borrarOperacionCompra(this.ganadoServicio, this.operacion,this.explotacionServ,this.toastCtrl,this.operacionServicio,this.location);
        }else{
          borrarOperacionVenta(this.ganadoServicio, this.operacion,this.explotacionServ,this.toastCtrl,this.operacionServicio,this.location);
        }
      }
      function borrarOperacionVenta(ganadoServicio:GanadoServicio, operacion:Operacion,
        explotacionServ:ExplotacionServicio,toastCtrl:ToastService,
        operacionServicio:OperacionServicio,location:Location) {
        const ide: IEIdentification = { id: operacion.id };
        let arrayIdOperacionesAux: Array<IEIdentification>;
        let explo: Explotacion = new Explotacion().fromJSON(explotacionServ.encontrarExplotacion({ id: explotacionServ.explotacionSeleccionada.id }));
        if (operacion.animales!=null && operacion.animales.length>0){
          operacion.animales.forEach((anim, index, arr) => {
            anim.baja=false;
            anim.precioVenta=0;
            anim.fechaOperacion= null;
            ganadoServicio.actualizarAnimal(anim, false).then(data => {
              console.log("animal actualizado", data);
            }).catch(err => {
              console.error("Errr al guardar los datos del animal!", err);
              toastCtrl.push("EWARNINGrror al guardar", "ERROR");
            });
          });
        }
        if (explo.arrayIdOperaciones != null && explo.arrayIdOperaciones.length > 0) {
          arrayIdOperacionesAux = explo.arrayIdOperaciones.filter((el) => el.id != operacion.id);
        }
        operacionServicio.borrarOperacion(ide).then(data => {
          toastCtrl.push("Operacion borrada correctamente", "SUCCESS");
          operacionServicio.operacionSeleccionada = null;
          if (explo.arrayIdOperaciones != null && explo.arrayIdOperaciones.length > 0) {
            explo.arrayIdOperaciones = arrayIdOperacionesAux;
          }
          explo.dineroAnual-=operacion.precio;
          explo.dineroTotal-=operacion.precio;
          explotacionServ.actualizarExplotacion(explo).then((data) => {
            location.back();
          }).catch(err => { throw new Error("Imposible sincronizar datos del animal con la explotacion: " + err);});
        }, err => {
          console.error("Errr al borrar los datos de la operacion!", err);
          toastCtrl.push("Error al borrar", "ERROR");
        }).catch(err => {
          console.error("Errr al borrar los datos de la operacion!", err);
          toastCtrl.push("Error al borrar", "ERROR");
        });
      }

      function borrarOperacionCompra(ganadoServicio:GanadoServicio, operacion:Operacion
        ,explotacionServ:ExplotacionServicio,toastCtrl:ToastService,
        operacionServicio:OperacionServicio,location:Location) {
        const ide: IEIdentification = { id: operacion.id };
        let arrayIdAnimalesAux: Array<IEIdentification>;
        let arrayIdOperacionesAux: Array<IEIdentification>;
        let cancelarBorradoCompra:boolean=false;
        operacion.animales.forEach(element => {
          if (!cancelarBorradoCompra){
            if (element.baja){
              if (element.precioVenta!=null){
                //Avisar de que hay que cancelar la venta primero
                cancelarBorradoCompra=true;
                toastCtrl.push("No se puede borrar porque el animal: " + element.numero +" ha sido vendido, cancela primero la venta", "ERROR");
              }else{
                //El animal ha muerto y no se puede cancelar la compra
                cancelarBorradoCompra=true;
                toastCtrl.push("No se puede borrar porque el animal: " + element.numero +" es baja", "ERROR");
              }
            }else{
              if (element.precioVenta!=null){
                //Avisar de que hay que cancelar la venta primero
                cancelarBorradoCompra=true;
                toastCtrl.push("No se puede borrar porque el animal: " + element.numero +" ha sido vendido, cancela primero la venta", "ERROR");
              }else if ((element.ascendenciaIds!=null && element.ascendenciaIds.length>0 )
              || (element.descendenciaIds!=null && element.descendenciaIds.length>0 )) {
                cancelarBorradoCompra=true;
                toastCtrl.push("No se puede borrar porque el animal: " + element.numero +" tiene descendencia asociada", "ERROR");
              }
            }
          }

        });
        if (!cancelarBorradoCompra){
          //  HAY QUE BORRAR LA OPERACION DE LA EXPLOTACION!!!!
          let explo: Explotacion = new Explotacion().fromJSON(explotacionServ.encontrarExplotacion({ id: explotacionServ.explotacionSeleccionada.id }));
          if (explo.arrayIdAnimales != null && explo.arrayIdAnimales.length > 0) {
            arrayIdAnimalesAux = explo.arrayIdAnimales.filter((el) => !operacion.arrayIdAnimales.includes(el));
          }
          ganadoServicio.borrarAnimal(operacion.animales).then(data => {
            if (explo.arrayIdAnimales != null && explo.arrayIdAnimales.length > 0) {
              explo.arrayIdAnimales = arrayIdAnimalesAux;
            }
            if (explo.arrayIdOperaciones != null && explo.arrayIdOperaciones.length > 0) {
              arrayIdOperacionesAux = explo.arrayIdOperaciones.filter((el) => el.id != operacion.id);
            }
            operacionServicio.borrarOperacion(ide).then(data => {
              toastCtrl.push("Operacion borrada correctamente", "SUCCESS");
              operacionServicio.operacionSeleccionada = null;
              if (explo.arrayIdOperaciones != null && explo.arrayIdOperaciones.length > 0) {
                explo.arrayIdOperaciones = arrayIdOperacionesAux;
              }
              explo.dineroAnual-=operacion.precio;
              explo.dineroTotal-=operacion.precio;
              explotacionServ.actualizarExplotacion(explo).then((data) => {
                location.back();
              }).catch(err => { throw new Error("Imposible sincronizar datos del animal con la explotacion: " + err);});
            }, err => {
              console.error("Errr al borrar los datos de la operacion!", err);
              toastCtrl.push("Error al borrar", "ERROR");
            }).catch(err => {
              console.error("Errr al borrar los datos de la operacion!", err);
              toastCtrl.push("Error al borrar", "ERROR");
            });
          });
        }

      }
    }

    this.toastCtrl.presentToastWithOptions("¿Quiere borrar esa operacion?", "WARNING", strCallback, null);
  }

  anadirAnimalesAOperacion(sexo:number){

		if(this.esCompra==Constantes.COMPRA_COMPRA){
      this.router.navigate(['ganadero/animal-nuevo'], {
        queryParams: {
          "explotacionID": this.explotacionServ.explotacionSeleccionada.id,
          "animalID": null,
          "sexo": sexo,
          "compra":Constantes.COMPRA_COMPRA
        }
      });
		}else{
      this.router.navigate(['ganadero/listado-ganado'],{queryParams:{"venta":Constantes.VENTA}});
		}


  }
	protected getFotoAnimal(animal) {
		if (animal.foto) {
			return animal.foto;
		} else {
			if (animal instanceof Macho) {
				return "assets/img/toro.png";
			} else {
				return "assets/img/vaca.png";
			}
		}
	}


  borrarAnimal(isHembra:boolean,data:any){
    console.log(data);
    if (isHembra){
      this.arrayHembras.forEach((element,index)=>{
        if(element==data){
          this.arrayHembras.splice(index,1);
        }
      });
    }else{
      this.arrayMachos.forEach((element,index)=>{
        if(element==data){
          this.arrayMachos.splice(index,1);
        }
      });
    }
    this.operacion.animales.forEach((element,index)=>{
      if(element==data){
        this.operacion.animales.splice(index,1);
      }
    });
    this.calculatePrice();
  }

  private calculatePrice(){
    let numberPrice:number = 0;
    let numberPeso:number = 0;
    if(this.esCompra==Constantes.COMPRA_COMPRA){
      this.operacion.animales.forEach(element=>{numberPrice+=element.precioCompra;numberPeso+=element.peso;});
		}else{
      this.operacion.animales.forEach(element=>{numberPrice+=element.precioVenta;numberPeso+=element.peso;});
		}
    this.operacion.precio=numberPrice;
    this.operacion.peso=numberPeso;
  }
}
