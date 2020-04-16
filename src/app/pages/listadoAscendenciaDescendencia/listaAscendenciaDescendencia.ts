import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { Component,EventEmitter, Input,Output   } from '@angular/core';
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Animal} from '../../servicios/beans/animal'
import {Macho} from '../../servicios/beans/macho'
//import {Hembra} from '../../servicios/beans/hembra'

@Component({
  selector: 'my-list-opcionesAscDesc',
  templateUrl: 'listaAscendenciaDescendencia.html'
})

export class AscDesc {
  @Input() model:Array<IEAnimal>;  

  @Input('tipo') tipo: boolean;

  @Input() texto: string;

  macho:Array<string>;

  hembra:Array<string>;

  @Output() arraySalida = new EventEmitter<Array<IEAnimal>>();

  constructor(public servicio: ServicioDatos) {
    console.log("entra en el constructor de listaAscendenciaDescendencia");
    this.macho=new Array<string>();
    this.hembra=new Array<string>();
  }

  ngAfterContentInit(){
    console.log("ENTRA EN EL ngAfterContentInit listaAscendenciaDescendencia ");
    console.log(this.model);
    if (this.model){
      for (let anim of this.model){
        if (anim instanceof Macho){
          this.macho.push(anim.id);
        }else{
          this.hembra.push(anim.id);
        }
      }
    }
  }

  onChange(tipo:boolean){

   console.log("ENTRA EN EL onChange listaAscendenciaDescendencia ");

   var arrayAux:Array<string>;
   //vaciamos el array de model para que no se solapen vacas y toros y no haya mas de la cuenta
   this.model=new Array<Animal>();

    if (this.macho && !(this.macho instanceof Array)){
      arrayAux=new Array<string>();
      arrayAux.push(this.macho);
      this.macho=arrayAux;
    }
    if (this.hembra && !(this.hembra instanceof Array)){
      arrayAux=new Array<string>();
      arrayAux.push(this.hembra);
      this.hembra=arrayAux;
    }

      for (let i of this.macho){
        let ani=this.servicio.getExplotacion().arrayMachos.find(x => x.id == i);
        if (ani){
          this.model.push(ani);
        }
      }

     for (let i of this.hembra){
        let ani=this.servicio.getExplotacion().arrayHembras.find(x => x.id == i);
        if (ani){
          this.model.push(ani);
        }
      }
    console.log("this.model");
    console.log(this.model);

     this.arraySalida.emit(this.model);
  
  }

  comprobarDentroArray(animal:Animal):boolean{
    if (this.model){
      let ani:IEAnimal =  this.model.find(x => x.id == animal.getId());
      console.log("luisin");
      console.log(ani);
      if (ani){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }

  }
}