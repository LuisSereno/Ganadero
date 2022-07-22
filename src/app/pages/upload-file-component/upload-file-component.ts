import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FileUpload } from 'src/app/servicios/beans/fileUpload';
import { FileUploadServicio } from 'src/app/servicios/fileUpload.service';
import { IonSlides } from '@ionic/angular';
import { Constantes } from 'src/app/servicios/genericos/constantes';
import { PhotoServicio } from 'src/app/servicios/photo.service';

@Component({
  selector: 'upload-file-component',
  templateUrl: './upload-file-component.html',
  styleUrls: ['./upload-file-component.scss']
})
export class UploadFileComponent implements OnInit, OnChanges {


  @Input() getFotoAnimal: () => string[];

  @ViewChild(IonSlides) slides: IonSlides;

  @Output() deletePhotoNumber = new EventEmitter<string>();

  selectedFiles: FileList;

  currentFileUpload: FileUpload;

  percentage: number;

  noSubida: boolean;

  pager=true;

  slideOpts = {
    initialSlide: 1,
    speed: 4000,
    loop: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true
    },
    pagination : {
      el: '.swiper-pagination',
      type: 'bullets' ,
      clickable: true
    }
  };

  constructor(private uploadService: FileUploadServicio,private photoService: PhotoServicio) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed

    if (!changes.getFotoAnimal.isFirstChange()){
      const intersection = changes.getFotoAnimal.currentValue.filter(element => changes.getFotoAnimal.previousValue.includes(element));
      if (intersection.length===0){
        if (this.slides) { this.slides.update().then(() => console.log('SLIDER UPDATED')); }
      }
    }
  }
  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
  }

  save(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.uploadService.guardaFile(this.currentFileUpload).subscribe(
        async percentage => {
          this.percentage = Math.round(percentage);
          if (this.percentage===100){
            do {
              await new Promise(f => setTimeout(f, 1000));
            }while (!this.currentFileUpload.url);
            resolve(true);
          }
        },
        error => {
          console.log(error);
          reject(new Error('No se ha podido subir la foto'));
        }
      );
    });
  }

  deletePhoto() {
    const arrayFoto=this.getFotoAnimal;
    this.slides.getActiveIndex().then(index => {
      if (index>0){
        const indexAux=index-1;
        const fileUpload:FileUpload= new FileUpload(null);
        if (arrayFoto[indexAux]){
          fileUpload.url= arrayFoto[indexAux];
          this.uploadService.borrarFile(fileUpload).then(()=> this.deletePhotoNumber.emit(fileUpload.url));
        }
      }
    });
  }

  addPhotoToGallery() {
    const photo=this.photoService.addNewToGallery();
    photo.then(pho  => {
      console.log(pho);
      this.currentFileUpload = new FileUpload(pho);
    });

  }

}
