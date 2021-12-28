// ToastService.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastBrowserService {

  private toasts: any[] = [];

  constructor(public toastController: ToastController) {}

  async push(msg:string,clase:string) {

    var cssClass="";
     switch (clase) {
       case "CORRECTO":
         cssClass= "success";
         break;
       case "WARNING":
         cssClass= "warning";
         break;
       case "ERROR":
         cssClass= "danger";
         break;
       default:
         cssClass= "success";
         break;
     }


    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: msg,
      position: 'top',
      duration: 3000,
      color: cssClass
      /*buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]*/
    });
    toast.present();
  }

  async pushWithButtons(msg:string,clase:string,buttonOkFunction: (n:any) => any, buttonKoFunction: (n:any) => any) {

    var cssClass="";
     switch (clase) {
       case "CORRECTO":
         cssClass= "success";
         break;
       case "WARNING":
         cssClass= "warning";
         break;
       case "ERROR":
         cssClass= "danger";
         break;
       default:
         cssClass= "success";
         break;
     }


    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: msg,
      position: 'top',
      duration: 3000,
      color: cssClass,
      buttons: [
        {
          side: 'end',
          text: 'OK',
          handler: () => {
           buttonOkFunction(null);
          }
        }, {
          side: 'end',
          text: 'KO',
          role: 'cancel',
          handler: () => {
            buttonKoFunction(null);
          }
        }
      ]
    });
    toast.present();
  }

}