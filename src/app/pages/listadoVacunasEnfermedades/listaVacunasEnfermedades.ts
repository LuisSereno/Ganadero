import { IEIdentification } from './../../servicios/beans/interfaces/identification.interface';
import { Constantes } from './../../servicios/genericos/constantes';
import { IEAnimal } from './../../servicios/beans/interfaces/animal.interface';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Animal } from '../../servicios/beans/animal'
import { Macho } from '../../servicios/beans/macho'
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
import { IEganadoServicio } from 'src/app/servicios/interfaces/ganado.service.interface';
import { ToastService } from 'src/app/servicios/genericos/mensajeToast';
import { Hembra } from 'src/app/servicios/beans/hembra';
import { IonSelect } from '@ionic/angular';
import { IEVacunaAnimal } from 'src/app/servicios/beans/interfaces/vacunaAnimal.interface';
import { IEEnfermedadAnimal } from 'src/app/servicios/beans/interfaces/enfermedadAnimal.interface';
import { VacunaAnimal } from 'src/app/servicios/beans/vacunaAnimal';
import { EnfermedadAnimal } from 'src/app/servicios/beans/enfermedadAnimal';
//import {Hembra} from '../../servicios/beans/hembra'

@Component({
  selector: 'my-list-vacunasenfermedades',
  styleUrls: ['./listaVacunasEnfermedades.scss'],
  templateUrl: 'listaVacunasEnfermedades.html'
})

export class VacunasEnfermedadesPage {

  explotacion: Explotacion;

  tipoMostrado: string;

  identificacionAnimal: string;

  textoCabecera: string;

  arrayDataShow: Promise<Array<any>>;

  arrayDataShowExplotacion: Promise<Array<any>>;

  anadirAGanado: any;

  ganado: IEAnimal;

  isSelect: boolean;

  @ViewChild("selectEnferVac", { static: false }) selectEnferVac: IonSelect;




  constructor(private navCtrl: Router, private servicioVac: VacunaServicio, private servicioEnf: EnfermedadServicio,
    private explotacionServ: ExplotacionServicio, private ganadoServ: GanadoServicio,
    private router: Router, private toastCtrl: ToastService, private params: ActivatedRoute) {

  }

  ngOnInit() {
    this.isSelect = false;
    if (this.explotacionServ.explotacionSeleccionada) {
      this.explotacion = this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada);
    } else {
      this.explotacion = new Explotacion();
    }


    // NO SE ESTÁN DIBUJANDO BIEN LAS ENTRADAS DE LAS VACUNAS
    this.arrayDataShow = Promise.resolve(new Array());
    this.arrayDataShowExplotacion = Promise.resolve(new Array());
  }

  ionViewWillEnter() {
    this.tipoMostrado = this.params.snapshot.paramMap.get('tipo');
    this.identificacionAnimal = this.params.snapshot.paramMap.get('id-animal');
    if (this.tipoMostrado === Constantes.VACUNA) {
      this.textoCabecera = 'Vacunas conocidas';
      if (this.identificacionAnimal) {
        this.ganado = this.ganadoServ.encontrarAnimal({ id: this.identificacionAnimal });
        if (this.ganado.sexo === Constantes.MACHO) {
          this.ganado = Macho.fromJSON(this.ganado);
        } else {
          this.ganado = Hembra.fromJSON(this.ganado);
        }
        this.fillArrayDataShowExplotation();
        //AQUI HAY QUE TRANSFORMAR LAS VACUNAS EN CASO DE QUE NO HAYAN SIDO YA TRASNFORMADAS
        //this.fillArrayDataShowExplotation().then( anyData => {
        let arrayAux = new Array<IEVacunaAnimal>();
        if (this.ganado.vacunas) {
          this.ganado.vacunas.forEach(x => {
            //let vacuna:IEVacuna= this.arrayDataShowExplotacion.find(y => y.id === x.vacuna.id);
            arrayAux.push(x);
          });
        }
        this.arrayDataShow = Promise.resolve(arrayAux);
        //});
        this.anadirAGanado = new VacunaAnimal();

      } else {
        this.servicioVac.obtenerTodasVacunas().then(listaVacunas => {
          this.arrayDataShow = Promise.resolve(listaVacunas);
          this.activarCard();
        })
          .catch(err => { console.error('no hay vacunas', err); this.arrayDataShow = Promise.resolve(new Array<IEVacunaAnimal>()) });
      }
    } else if (this.tipoMostrado === Constantes.ENFERMEDAD) {
      this.textoCabecera = 'Enfermedades conocidas';
      if (this.identificacionAnimal) {
        this.ganado = this.ganadoServ.encontrarAnimal({ id: this.identificacionAnimal });
        if (this.ganado.sexo === Constantes.MACHO) {
          this.ganado = Macho.fromJSON(this.ganado);
        } else {
          this.ganado = Hembra.fromJSON(this.ganado);
        }
        //AQUI HAY QUE TRANSFORMAR LAS VACUNAS EN CASO DE QUE NO HAYAN SIDO YA TRASNFORMADAS
        //this.fillArrayDataShowExplotation().then( anyData => {
        this.fillArrayDataShowExplotation()
        let arrayAux = new Array<IEEnfermedadAnimal>();
        if (this.ganado.enfermedades) {
          this.ganado.enfermedades.forEach(x => {
            //let envermedad:IEEnfermedad= this.arrayDataShowExplotacion.find(y => y.id === x.enfermedad.id);
            arrayAux.push(x);
          });
        }
        this.arrayDataShow = Promise.resolve(arrayAux);
        //});
        this.anadirAGanado = new EnfermedadAnimal();
      } else {
        this.servicioEnf.obtenerTodasEnfermedades().then(listaEnfermedades => {
          this.arrayDataShow = Promise.resolve(listaEnfermedades);
          this.activarCard();
        })
          .catch(err => { console.error('no hay enfermedades', err); this.arrayDataShow = Promise.resolve(new Array<IEEnfermedadAnimal>()) });
      }
    }
  }

  private fillArrayDataShowExplotation(): Promise<any> {
    if (this.tipoMostrado === Constantes.VACUNA) {
      return this.servicioVac.obtenerDatosVacunaIds(this.explotacion.arrayIdVacunas).then(listaVacunas => {
        this.arrayDataShowExplotacion = Promise.resolve(listaVacunas);
      })
        .catch(err => { console.error('no hay vacunas', err); this.arrayDataShow = Promise.resolve(new Array<IEVacuna>()) });
    } else {
      return this.servicioEnf.obtenerDatosEnfermedadIds(this.explotacion.arrayIdEnfermedades).then(listaEnfermedades => {
        this.arrayDataShowExplotacion = Promise.resolve(listaEnfermedades);
      })
        .catch(err => { console.error('no hay enfermedades', err); this.arrayDataShow = Promise.resolve(new Array<IEEnfermedad>()) });
    }
  }

  private activarCard() {
    this.arrayDataShow.then(arrayDS => {
      for (const info of arrayDS) {
        if (this.tipoMostrado === Constantes.VACUNA) {
          if (this.explotacion.arrayIdVacunas) {
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
          if (this.explotacion.arrayIdEnfermedades) {
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
    });

  }

  ionViewWillLeave() {
    if (!this.identificacionAnimal) {
      console.log('ionviewwilleave');
      const arrayDataShowSelected: Array<any> = new Array<IEEnfermedad>();
      const arrayIdShowSelected: Array<IEIdentification> = new Array<IEIdentification>();
      const exploCopy: Explotacion = new Explotacion().
        fromJSON(this.explotacionServ.encontrarExplotacion(this.explotacionServ.explotacionSeleccionada));
      this.arrayDataShow.then(arrayDS => {
        for (const info of arrayDS) {
          if (info.isChecked) {
            arrayDataShowSelected.push(info);
            const idData: IEIdentification = { id: info.id };
            arrayIdShowSelected.push(idData);
          }
        }
        if (arrayDataShowSelected.length > 0) {
          if (this.tipoMostrado === Constantes.VACUNA) {
            this.explotacion.arrayVacunas = arrayDataShowSelected;
            exploCopy.arrayIdVacunas = arrayIdShowSelected;
          } else {
            this.explotacion.arrayEnfermedades = arrayDataShowSelected;
            exploCopy.arrayIdEnfermedades = arrayIdShowSelected;
          }
          this.explotacionServ.actualizarExplotacion(exploCopy).
            catch(err => { throw new Error('Imposible sincronizar datos VacunaEnf con la explotacion: ' + err); });
        }
      });


    }
  }

  anadirElementoExplotacion() {
    console.log('activaElementoEnExplotacion');
  }

  anadirVacEnf(esDetalle: boolean, vacunaEnfID: string = null) {
    if (esDetalle) {
      this.navCtrl.navigate(['ganadero/detalle-vacunasenfermedades'], { queryParams: { type: this.tipoMostrado, vacunaEnfID } });
    } else {
      this.navCtrl.navigate(['ganadero/detalle-vacunasenfermedades'], { queryParams: { type: this.tipoMostrado } });
    }
  }

  anadirDatosAGanado() {
    console.log('anadirDatosAGanado', this.anadirAGanado);
    if (this.anadirAGanado != null && (this.anadirAGanado.fecha != null && this.anadirAGanado.fecha != "")) {
      if (this.tipoMostrado === Constantes.VACUNA) {
        if (!this.ganado.vacunas) { this.ganado.vacunas = new Array<IEVacunaAnimal>(); }
        this.ganado.vacunas.push(this.anadirAGanado);
        this.arrayDataShow = Promise.resolve(this.ganado.vacunas);
        this.anadirAGanado = new Vacuna();
        this.arrayDataShowExplotacion = null;
        this.selectEnferVac.value = null;
        this.fillArrayDataShowExplotation();
      } else {
        if (!this.ganado.enfermedades) { this.ganado.enfermedades = new Array<IEEnfermedadAnimal>(); }
        this.ganado.enfermedades.push(this.anadirAGanado);
        this.arrayDataShow = Promise.resolve(this.ganado.enfermedades);
        this.anadirAGanado = new Enfermedad();
        this.arrayDataShowExplotacion = null;
        this.selectEnferVac.value = null;
        this.fillArrayDataShowExplotation();
      }
      this.ganadoServ.actualizarAnimal(this.ganado,false).then(data => {
        this.toastCtrl.push('Modificación correcta', 'CORRECTO');
        this.isSelect = false;
      }, err => {
        console.error('Errr al guardar los datos del animal!', err);
        this.toastCtrl.push('Error al modificar', 'ERROR');
      }).catch(err => {
        console.error('Errr al guardar los datos del animal!', err);
        this.toastCtrl.push('Error al modificar', 'ERROR');
      });
    } else {
      this.toastCtrl.push('Introduce información antes de guardar', 'WARNING');
    }


  }

  getIdSeleccion($event) {
    console.log('getIdSeleccion($event)', $event.target.value);
    if (this.tipoMostrado === Constantes.VACUNA) {
      this.arrayDataShowExplotacion.then(arrayData => {
        this.anadirAGanado.vacuna = arrayData.find(x => x.id === $event.target.value)
        if (this.anadirAGanado.vacuna!=null){
          this.isSelect = true;
        }
      });
    } else {
      this.arrayDataShowExplotacion.then(arrayData => {
        this.anadirAGanado.enfermedad = arrayData.find(x => x.id === $event.target.value)
        if (this.anadirAGanado.enfermedad!=null){
          this.isSelect = true;
        }
      });
    }
  }
}