import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUpload } from 'src/app/servicios/beans/fileUpload';
import { FileUploadServicio } from 'src/app/servicios/fileUpload.service';

@Component({
  selector: 'upload-file-component',
  templateUrl: './upload-file-component.html',
  styleUrls: ['./upload-file-component.scss']
})
export class UploadFileComponent implements OnInit {

  // @Input() filtroAvanzadoEntrada:Filtro;


  // @Output() fileUploadEmmit = new EventEmitter<FileUpload>();

  @Input() getFotoAnimal: () => void;

  selectedFiles: FileList;

  currentFileUpload: FileUpload;

  percentage: number;

  noSubida: boolean;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination : {
      el: '.swiper-pagination',
      type: 'bullets' ,
      clickable: true
    }
  };

  constructor(private uploadService: FileUploadServicio) { }

  ngOnInit(): void {
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


}
