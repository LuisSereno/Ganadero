import { IEIdentification } from './../../servicios/beans/interfaces/identification.interface';
import { Constantes } from './../../servicios/genericos/constantes';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { Component,EventEmitter, Input,Output   } from '@angular/core';
import {Animal} from '../../servicios/beans/animal'
import {Macho} from '../../servicios/beans/macho'
import { GanadoServicio } from 'src/app/servicios/ganado.service';
import { VacunaServicio } from 'src/app/servicios/vacuna.service';
import { EnfermedadServicio } from 'src/app/servicios/enfermedad.service';
import { ExplotacionServicio } from 'src/app/servicios/explotacion.service';
import { Explotacion } from 'src/app/servicios/beans/explotacion';
import { Router, ActivatedRoute } from '@angular/router';
import { Enfermedad } from 'src/app/servicios/beans/enfermedad';
import { IEVacuna } from 'src/app/servicios/beans/interfaces/vacuna.interface';
import { IEEnfermedad } from 'src/app/servicios/beans/interfaces/enfermedad.interface';
//import {Hembra} from '../../servicios/beans/hembra'

@Component({
  selector: 'my-list-vacunasenfermedades',
  styleUrls: ['./listaVacunasEnfermedades.scss'],
  templateUrl: 'listaVacunasEnfermedades.html'
})

export class VacunasEnfermedadesPage {

  explotacion:Explotacion;

  tipoMostrado: string;

  textoCabecera:string;

  arrayDataShow:Array<any>;

  constructor(private navCtrl: Router,private servicioVac: VacunaServicio,private servicioEnf: EnfermedadServicio,
    private explotacionServ: ExplotacionServicio,
    private router: Router, private params: ActivatedRoute) {

  }

  ngOnInit(){
		if(this.explotacionServ.explotacionSeleccionada){
			this.explotacion=this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada);
		}else{
			this.explotacion = new Explotacion();
		}
  }

  ionViewWillEnter() {
    this.tipoMostrado=this.params.snapshot.paramMap.get('tipo');
    if(this.tipoMostrado===Constantes.VACUNA){
      this.textoCabecera= 'Enfermedades conocidas';
      this.servicioVac.obtenerTodasVacunas().then(listaVacunas=>{
        this.arrayDataShow=listaVacunas;
        this.activarCard();
      })
        .catch(err=>{console.error('no hay vacunas',err); this.arrayDataShow=new Array<IEVacuna>()});
    }else if(this.tipoMostrado===Constantes.ENFERMEDAD){
      this.textoCabecera= 'Vacunas conocidas';
      this.servicioEnf.obtenerTodasEnfermedades().then(listaEnfermedades=>{
        this.arrayDataShow=listaEnfermedades;
        this.activarCard();
      })
      .catch(err=>{console.error('no hay enfermedades',err); this.arrayDataShow=new Array<IEEnfermedad>()});
    }


  }

  private activarCard() {
    for (const info of this.arrayDataShow) {
      if (this.tipoMostrado === Constantes.VACUNA) {
        for (const infoCheck of this.explotacion.arrayIdVacunas) {
          if (info.id === infoCheck.id) {
            info.isChecked = true;
          }
          else {
            info.isChecked = false;
          }
        }
      }
      else {
        for (const infoCheck of this.explotacion.arrayIdEnfermedades) {
          if (info.id === infoCheck.id) {
            info.isChecked = true;
          }
          else {
            info.isChecked = false;
          }
        }
      }
    }
  }

  ionViewWillLeave(){
    console.log('ionviewwilleave');
    const arrayDataShowSelected:Array<any>=new Array<IEEnfermedad>();
    const arrayIdShowSelected:Array<IEIdentification>=new Array<IEIdentification>();
    let exploCopy: Explotacion = new Explotacion().
    fromJSON(this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada));
    for (const info of this.arrayDataShow){
      if (info.isChecked){
        arrayDataShowSelected.push(info);
        arrayIdShowSelected.push(info.id);
      }
    }
    if (arrayDataShowSelected.length>0){
      if(this.tipoMostrado===Constantes.VACUNA){
        this.explotacion.arrayVacunas=arrayDataShowSelected;
        exploCopy.arrayIdVacunas=arrayIdShowSelected;
      }else{
        this.explotacion.arrayEnfermedades=arrayDataShowSelected;
        exploCopy.arrayIdEnfermedades=arrayIdShowSelected;
      }
      this.explotacionServ.actualizarExplotacion(exploCopy).
      catch(err => { throw new Error('Imposible sincronizar datos VacunaEnf con la explotacion: ' + err); });
    }
  }

  anadirVacEnf(esDetalle:boolean,vacunaEnfID:string=null){
    if (esDetalle){
      this.navCtrl.navigate(['ganadero/detalle-vacunasenfermedades'],{queryParams:{type:this.tipoMostrado, vacunaEnfID}});
    }else{
      this.navCtrl.navigate(['ganadero/detalle-vacunasenfermedades'],{queryParams:{type:this.tipoMostrado}});
    }
  }

}