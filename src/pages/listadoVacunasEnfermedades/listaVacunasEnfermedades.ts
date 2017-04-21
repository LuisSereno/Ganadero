import { Component, Input  } from '@angular/core';

@Component({
  selector: 'my-list-vacunasenfermedades',
  template:`
        <div *ngFor="let textoLabel of model; let n=index" >
         <ion-item>
        	<input type="string" value="{{textoLabel}}" disabled>
        	<ion-icon name="remove-circle" (click)="eliminarElementoArray(textoLabel)"></ion-icon>
         </ion-item>
        </div>   `
})

export class ListVacEnf {
  @Input() model:Array<string>;  

	eliminarElementoArray(msg:string) {
	    let index: number = this.model.indexOf(msg);
	    if (index !== -1) {
	        this.model.splice(index, 1);
	    }        
	}
}