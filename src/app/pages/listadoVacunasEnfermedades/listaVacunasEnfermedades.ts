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
import { Vacuna } from 'src/app/servicios/beans/vacuna';
//import {Hembra} from '../../servicios/beans/hembra'

@Component({
  selector: 'my-list-vacunasenfermedades',
  styleUrls: ['./listaVacunasEnfermedades.scss'],
  templateUrl: 'listaVacunasEnfermedades.html'
})

export class VacunasEnfermedadesPage {

  explotacion:Explotacion;

  tipoMostrado: string;

  identificacionAnimal: string;

  textoCabecera:string;

  arrayDataShow:Array<any>;

  anadirAGanado:any;


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
    this.identificacionAnimal= this.params.snapshot.paramMap.get('id-animal');
    if(this.tipoMostrado===Constantes.VACUNA){
      this.textoCabecera= 'Vacunas conocidas';
      if (this.identificacionAnimal){

        ///EL ERROR AQUI ES QUE EL IDENFERMEDADES NO ESTA RESPETANDO LA INTERFAZ
        this.servicioVac.obtenerDatosVacunaIds(this.explotacion.arrayIdVacunas).then(listaVacunas=>{
          this.arrayDataShow=listaVacunas;
        })
          .catch(err=>{console.error('no hay vacunas',err); this.arrayDataShow=new Array<IEVacuna>()});
          this.anadirAGanado=new Vacuna();
      }else{
        this.servicioVac.obtenerTodasVacunas().then(listaVacunas=>{
          this.arrayDataShow=listaVacunas;
          this.activarCard();
        })
          .catch(err=>{console.error('no hay vacunas',err); this.arrayDataShow=new Array<IEVacuna>()});
      }
    }else if(this.tipoMostrado===Constantes.ENFERMEDAD){
      this.textoCabecera= 'Enfermedades conocidas';
      if (this.identificacionAnimal){

        ///EL ERROR AQUI ES QUE EL IDENFERMEDADES NO ESTA RESPETANDO LA INTERFAZ
        this.servicioEnf.obtenerDatosEnfermedadIds(this.explotacion.arrayIdEnfermedades).then(listaEnfermedades=>{
          this.arrayDataShow=listaEnfermedades;
        })
        .catch(err=>{console.error('no hay enfermedades',err); this.arrayDataShow=new Array<IEEnfermedad>()});
        this.anadirAGanado=new Enfermedad();
      }else{
        this.servicioEnf.obtenerTodasEnfermedades().then(listaEnfermedades=>{
          this.arrayDataShow=listaEnfermedades;
          this.activarCard();
        })
        .catch(err=>{console.error('no hay enfermedades',err); this.arrayDataShow=new Array<IEEnfermedad>()});
      }
    }
  }

  private activarCard() {
    for (const info of this.arrayDataShow) {
      if (this.tipoMostrado === Constantes.VACUNA) {
        if (this.explotacion.arrayIdVacunas){
          for (const infoCheck of this.explotacion.arrayIdVacunas) {
            if (info.id === infoCheck.id) {
              info.isChecked = true;
              break;
            }
            else {
              info.isChecked = false;
            }
          }
        }
      }
      else {
        if (this.explotacion.arrayIdEnfermedades){
          for (const infoCheck of this.explotacion.arrayIdEnfermedades) {
            if (info.id === infoCheck.id) {
              info.isChecked = true;
              break;
            }
            else {
              info.isChecked = false;
            }
          }
        }
      }
    }
  }

  ionViewWillLeave(){
    if (!this.identificacionAnimal){
      console.log('ionviewwilleave');
      const arrayDataShowSelected:Array<any>=new Array<IEEnfermedad>();
      const arrayIdShowSelected:Array<IEIdentification>=new Array<IEIdentification>();
      const exploCopy: Explotacion = new Explotacion().
      fromJSON(this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada));
      for (const info of this.arrayDataShow){
        if (info.isChecked){
          arrayDataShowSelected.push(info);
          const idData: IEIdentification = { id: info.id };
          arrayIdShowSelected.push(idData);
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
  }

  anadirElementoExplotacion(){
    console.log('activaElementoEnExplotacion');
  }

  anadirVacEnf(esDetalle:boolean,vacunaEnfID:string=null){
    if (esDetalle){
      this.navCtrl.navigate(['ganadero/detalle-vacunasenfermedades'],{queryParams:{type:this.tipoMostrado, vacunaEnfID}});
    }else{
      this.navCtrl.navigate(['ganadero/detalle-vacunasenfermedades'],{queryParams:{type:this.tipoMostrado}});
    }
  }

  anadirDatosAGanado(){
    console.log('anadirDatosAGanado', this.anadirAGanado);
  }

  getIdSeleccion($event){
    console.log('getIdSeleccion($event)', $event.target.value);
    this.anadirAGanado.id=$event.target.value;
  }
}