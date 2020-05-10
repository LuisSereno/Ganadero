import {FormControl,FormGroup} from '@angular/forms';
//import {ServicioDatos} from './serviciodatos'

export class EmailValidator {
 
  static checkEmail(control: FormControl){

    console.log("e-mail check");

    var requiredDomains = ["gmail.com","yahoo.com"];
    var lowercaseValue = control.value.toLowerCase();
    var providedDomain = lowercaseValue.substr(lowercaseValue.indexOf('@')+1);
    var returnVal: any;

    for (var i = 0; i < requiredDomains.length; i++) {
      if(requiredDomains[i] != providedDomain) {
        returnVal =  {"invalid_domain": true};
        i = requiredDomains.length;
      }
    }
    
    return returnVal;
  }
 
}

export class PasswordValidator {
 
  static isMatching(group: FormGroup){

    console.log("password check");
    
    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['re_password'].value;
    if((firstPassword && secondPassword) && (firstPassword != secondPassword)){
      console.log("mismatch");
      return { "pw_mismatch": true };      
    } else{
      return null;
    }
    
  }
 
}

export class AgeValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }
 
        if(control.value < 18){
            return {
                "too young": true
            };
        }
 
        if (control.value > 120){
            return {
                "not realistic": true
            };
        }
 
        return null;
    }
 
}
