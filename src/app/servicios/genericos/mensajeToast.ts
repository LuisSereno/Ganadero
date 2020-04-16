// ToastService.ts
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  private toasts: any[] = [];

  constructor(private toastCtrl: ToastController) {
  }

  async push(msg:string,clase:string) {

    var cssClass="";
     switch (clase) {
       case "CORRECTO":
         cssClass= "toast-success";
         break;
       case "WARNING":
         cssClass= "toast-warning";
         break;
       case "ERROR":
         cssClass= "toast-error";
         break;      
       default:
         cssClass= "toast-success";
         break;
     }

    let toast = await this.toastCtrl.create({
        message: msg,
        duration: 15000,
        cssClass: cssClass
    });

    toast.onDidDismiss().then((r) => {
        console.log("toast result:", r);
        this.toasts.shift()
        if (this.toasts.length > 0) {
          this.show()
        }
    });

    this.toasts.push(toast)

    if (this.toasts.length === 1) {
      this.show()
    }
  }

  show() {
    this.toasts[0].present();
  }

  dismissAll() {
    this.toasts[0].dismissAll();
  }
}