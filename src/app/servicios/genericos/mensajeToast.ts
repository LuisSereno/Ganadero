// ToastService.ts
import { Injectable } from '@angular/core';
import { ToastBrowserService } from './mensajeToastBrowser';
import { ToastNativeService } from './mensajeToastNative';
import { Platform } from '@ionic/angular';

@Injectable()
export class ToastService {

  constructor(private toastBrowser: ToastBrowserService,
    private toastNative: ToastNativeService,
    public platform: Platform) {
  }

  async push(msg:string,clase:string) {
    if(this.platform.is('desktop')){
      return this.toastBrowser.push(msg,clase);
    }else{
      return this.toastNative.push(msg,clase);
    }
  }

}
