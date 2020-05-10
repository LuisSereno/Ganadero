import { Component,EventEmitter, Input,Output  } from '@angular/core';

@Component({
  selector: 'my-list-vacunasenfermedades',
  template:`
      <ion-item>
        <ion-label position="floating"><ion-icon name='map' item-left class="color-iconos"></ion-icon>{{texto}}</ion-label>
        <ion-input type="string" #elementoVacuna></ion-input>
        <button ion-button clear item-right (click)='anadirElementoArray(elementoVacuna)'>
            <ion-icon name="add-circle"></ion-icon>
        </button>
      </ion-item>
        <div *ngFor="let textoLabel of model; let n=index" >
         <ion-item>
        	  <ion-input type="string" value="{{textoLabel}}" disabled></ion-input>
            <button ion-button clear item-right (click)="eliminarElementoArray(textoLabel)">
        	    <ion-icon name="remove-circle" ></ion-icon>
            </button>
         </ion-item>
        </div>   
    
    `
})

export class ListVacEnf {
  @Input() model:Array<string>;  

  @Input() texto:string;

  @Output() arraySalida = new EventEmitter<Array<string>>();

	eliminarElementoArray(msg:string) {
	    let index: number = this.model.indexOf(msg);
	    if (index !== -1) {
	        this.model.splice(index, 1);
	    }        
	}

    anadirElementoArray(elemento:HTMLInputElement){
      if (elemento.value!=""){
        if (this.model==null){
          this.model=new Array<string>();
        }
        this.model.push(elemento.value);
        elemento.value=null;
      }

      this.arraySalida.emit(this.model);
    }

}