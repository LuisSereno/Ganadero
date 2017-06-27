import { Component,EventEmitter, Input,Output   } from '@angular/core';
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Animal} from '../../servicios/beans/animal'
import {Macho} from '../../servicios/beans/macho'
import {Hembra} from '../../servicios/beans/hembra'

@Component({
  selector: 'my-list-opcionesAscDesc',
  templateUrl: 'listaAscendenciaDescendencia.html'
})

export class AscDesc {
  @Input() model:Array<Animal>;  

  @Input('tipo') tipo: boolean;

  @Input() texto: string;

  macho:Array<number>;

  hembra:Array<number>;

  @Output() arraySalida = new EventEmitter<Array<Animal>>();

  constructor(public servicio: ServicioDatos) {
    console.log("entra en el constructor de listaAscendenciaDescendencia");
    this.macho=new Array<number>();
    this.hembra=new Array<number>();
  }

  ngOnInit(){
    if (this.model){
      for (let anim of this.model){
        if (anim instanceof Macho){
          this.macho.push(anim.getId());
        }else{
          this.hembra.push(anim.getId());
        }
      }
    }
  }

  onChange(tipo:boolean){
   var arrayAux:Array<number>;
   //vaciamos el array de model para que no se solapen vacas y toros y no haya mas de la cuenta
   this.model=new Array<Animal>();

    if (this.macho && !(this.macho instanceof Array)){
      arrayAux=new Array<number>();
      arrayAux.push(this.macho);
      this.macho=arrayAux;
    }
    if (this.hembra && !(this.hembra instanceof Array)){
      arrayAux=new Array<number>();
      arrayAux.push(this.hembra);
      this.hembra=arrayAux;
    }

      for (let i of this.macho){
        let ani=this.servicio.getExplotacion().getArrayMachos().find(x => x.getId() == i);
        if (ani){
          this.model.push(ani);
        }
      }

     for (let i of this.hembra){
        let ani=this.servicio.getExplotacion().getArrayHembras().find(x => x.getId() == i);
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
      let ani:Animal =  this.model.find(x => x.getId() == animal.getId());
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