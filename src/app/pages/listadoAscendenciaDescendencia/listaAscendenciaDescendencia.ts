import { IEIdentification } from './../../servicios/beans/interfaces/identification.interface';
import { Constantes } from './../../servicios/genericos/constantes';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { Component,EventEmitter, Input,Output   } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Macho} from '../../servicios/beans/macho'
import { GanadoServicio } from 'src/app/servicios/ganado.service';
//import {Hembra} from '../../servicios/beans/hembra'

@Component({
  selector: 'my-list-opcionesAscDesc',
  styleUrls: ['./listaAscendenciaDescendencia.scss'],
  templateUrl: 'listaAscendenciaDescendencia.html'
})

export class AscDesc {
  @Input() model:Array<IEAnimal>;

  @Input('tipo') tipo: boolean;

  @Input() texto: string;

  @Input() animalesSelecionados: any;

  @Output() animalesSelecionadosChange = new EventEmitter<Array<IEAnimal>>();

  constructor(private servicio: GanadoServicio) {

  }

  ngAfterContentInit(){
    if (this.model){
      this.model = this.model.filter(function( element ) {
        return element !== undefined;
     });
    }
  }

  onChange(tipo:boolean){

   console.log("ENTRA EN EL onChange listaAscendenciaDescendencia ");

  // var arrayAux:Array<string>;
   //vaciamos el array de model para que no se solapen vacas y toros y no haya mas de la cuenta
  // this.model=new Array<Animal>();
/*
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
        let ani=this.servicio.ganado.find(x => x.id == i);
        if (ani){
          this.model.push(ani);
        }
      }

     for (let i of this.hembra){
        let ani=this.servicio.ganado.find(x => x.id == i);
        if (ani){
          this.model.push(ani);
        }
      }
    console.log("this.model");
    console.log(this.model);

     this.arraySalida.emit(this.model);
  */
      const arrayAux: Array<IEAnimal>= new Array<IEAnimal>();
      if (typeof(this.animalesSelecionados) === 'string'){
        arrayAux.push(this.servicio.encontrarAnimal({id:this.animalesSelecionados.toString()}));
      }else{
        this.animalesSelecionados.forEach(element => {
          arrayAux.push(this.servicio.encontrarAnimal({id:element.toString()}));
        });
      }
    this.animalesSelecionadosChange.emit(arrayAux);
  }

  comprobarDentroArray(animal:Animal):boolean{
    if (this.model){
      let ani:IEAnimal =  this.model.find(x => x.id == animal.getId());
      if (ani){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }

  }

  protected getFotoAnimal(animal:Animal) {
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

  prepareImageSelector() {
    setTimeout(() => {
        let buttonElements = document.querySelectorAll('div.alert-radio-group button');
        if (!buttonElements.length) {
            this.prepareImageSelector();
        } else {
            for (let index = 0; index < buttonElements.length; index++) {
                let buttonElement = buttonElements[index];
                let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
                let image = optionLabelElement.innerHTML.trim();

                let anim:IEAnimal= this.model.find(x => {
                  if (x.alias == image){
                    return x;
                  }else if (x.numero.toString() == image){
                    return x;
                  }
                });
                if (anim.sexo==Constantes.MACHO){
                  optionLabelElement.innerHTML='<img src="assets/img/toro.png" style="width: 2vw;">'+ image;
                }else{
                  optionLabelElement.innerHTML='<img src="assets/img/vaca.png" style="width: 2vw;">'+ image;
                }
            }
        }
    }, 100);
}

  compareById(o1, o2) {
    try{
      if (o2.id!==undefined){
        return o1 === o2.id
      }else{
        return o1 === o2
      }
    }catch(e){
      console.error("no se puede comparar",e)
    }
    return false;
  }
}