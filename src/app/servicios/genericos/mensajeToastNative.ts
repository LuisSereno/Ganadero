// ToastService.ts
import { Injectable } from '@angular/core';
import { Toast, ToastOptions } from '@ionic-native/toast/ngx';

@Injectable()
export class ToastNativeService {

  private toasts: any[] = [];

  constructor(private toastCtrl: Toast) {
  }

  async push(msg:string,clase:string) {

    var cssClass="";
     switch (clase) {
       case "CORRECTO":
         cssClass= "#8bc34a";
         break;
       case "WARNING":
         cssClass= "#ffc107";
         break;
       case "ERROR":
         cssClass= "#f44336";
         break;      
       default:
         cssClass= "#8bc34a";
         break;
     }


    let optionsToast:ToastOptions={
        message: msg,
        duration: 15000,
        styling: {
          backgroundColor: cssClass
        }
    };
    this.toastCtrl.showWithOptions(optionsToast).subscribe(
      toast => {
        console.log(toast);
      }
    );
/*
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
    */
  }

  show() {
    this.toasts[0].present();
  }

  dismissAll() {
    this.toasts[0].dismissAll();
  }
}