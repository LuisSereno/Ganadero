import { IEIdentification } from './../../servicios/beans/interfaces/identification.interface';
import { Constantes } from './../../servicios/genericos/constantes';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { Component,EventEmitter, Input,Output   } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Macho} from '../../servicios/beans/macho'
import { GanadoServicio } from 'src/app/servicios/ganado.service';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';
import { SSL_OP_NO_TLSv1_2 } from 'constants';
import { timingSafeEqual } from 'crypto';
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

  @Input() animalHerencia:IEIdentification;

  @Output() animalesSelecionadosChange = new EventEmitter<Array<IEAnimal>>();

  constructor(private servicio: GanadoServicio,private toastCtrl: ToastService) {

  }

  ngAfterContentInit(){
    if (this.model){
      this.model = this.model.filter(function( element ) {
        return element !== undefined;
     });
    }
  }

  onChange(){
    if (!this.tipo && this.animalesSelecionados.length>2){
      this.toastCtrl.push("El máximo de ascendentes es 2, por favor, deseleccione alguno", "WARNING");
    }else{
      console.log("ENTRA EN EL onChange listaAscendenciaDescendencia ");

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

  protected getFotoAnimal(animal:IEAnimal) {
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
            buttonElements = document.querySelectorAll('button.alert-checkbox-button');
            if (!buttonElements.length){
              this.prepareImageSelector();
            }else{
              this.createRadioElements(buttonElements,false);
            }
        } else {
            this.createRadioElements(buttonElements,true);
        }
    }, 100);

    console.log(this.animalesSelecionados);
}

  private createRadioElements(buttonElements: NodeListOf<Element>, isRadio:boolean) {

    for (let index = 0; index < buttonElements.length; index++) {
      let buttonElement = buttonElements[index];
      let optionLabelElement = null;
      if (isRadio){
        optionLabelElement = buttonElement.querySelector('.alert-radio-label');
      }else{
        optionLabelElement = buttonElement.querySelector('.alert-checkbox-label');
      }
      let image = optionLabelElement.innerHTML.trim();

      let anim: IEAnimal = this.model.find(x => {
        if (x.alias == image) {
          return x;
        } else if (x.numero.toString() == image) {
          return x;
        }
      });
      if (anim.sexo == Constantes.MACHO) {
        optionLabelElement.innerHTML = '<ion-item><ion-thumbnail slot="start"><ion-img src="' + this.getFotoAnimal(anim) + '"></ion-img></ion-thumbnail>' + '<ion-label><p>' + image + '</p></ion-label>' + '</ion-item>';
      } else {
        optionLabelElement.innerHTML = '<ion-item><ion-thumbnail slot="start"><ion-img src="'+ this.getFotoAnimal(anim) +'"></ion-img></ion-thumbnail>' + '<ion-label><p>' + image + '</p></ion-label>'+ '</ion-item>';
      }
    }
  }

  compareById(o1, o2) {
    try{
      if (o2.id!==undefined){
        return o1 === o2.id
      }else if(Array.isArray(o2)){
        let valorExiste=false;
        o2.forEach(x => {
          if (x.id == o1) {
            valorExiste=true;
          }
        });
        if(valorExiste){
          return true;
        }
      }else{
        return o1 === o2
      }
    }catch(e){
      console.error("no se puede comparar",e)
    }
    return false;
  }
}