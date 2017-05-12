import { Component, Input  } from '@angular/core';
import {ServicioDatos} from '../../servicios/serviciodatos';
import {Animal} from '../../servicios/beans/animal'

@Component({
  selector: 'my-list-opcionesAscDesc',
  templateUrl: 'listaAscendenciaDescendencia.html'
})

export class AscDesc {
  @Input() model:Array<Animal>;  

  @Input('tipo') tipo: boolean;

  macho:Array<Animal>;

  hembra:Array<Animal>;

  constructor(public servicio: ServicioDatos) {
    console.log("entra en el constructor de listaAscendenciaDescendencia");
  }

  onChange(){
    var arrayAux:Array<Animal>;
    if (this.macho && !(this.macho instanceof Array)){
      arrayAux=new Array<Animal>();
      arrayAux.push(this.macho);
      this.macho=arrayAux;
    }
    if (this.hembra && !(this.hembra instanceof Array)){
      arrayAux=new Array<Animal>();
      arrayAux.push(this.hembra);
      this.hembra=arrayAux;
    }
    if (this.hembra && this.macho){
      this.model=this.macho.concat( this.hembra);
    }else if (this.macho){
      this.model=this.macho;
    }else if (this.hembra){
      this.model=this.hembra;
    }
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