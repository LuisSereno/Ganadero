// app/pages/profile/profile.ts
import { NavController } from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthService} from '../../servicios/auth/auth';
import {ToolBarMenu} from '../toolbarMenu/toolbarMenu';

@Component({
  templateUrl: 'profile.html'
})
export class PerfilAutenticacion {
  
	// We need to inject AuthService so that we can
	// use it in the view
	constructor(private navCtrl: NavController,private auth: AuthService) {
		 this.redirectToSearch();
	}

	redirectToSearch(){
	  if(this.auth.authenticated()) {
	    //this.navCtrl.push(TabsPage);
	  	this.navCtrl.setRoot(ToolBarMenu);
	  }else{
	    this.auth.lock.on('authenticated', authResult => {
	      //this.navCtrl.push(TabsPage);
	      this.navCtrl.setRoot(ToolBarMenu);
	    });
	  } 
	}

}
