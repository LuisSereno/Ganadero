import { Injectable, Inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { UserPhoto } from './beans/interfaces/userPhoto.interface';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Injectable()
export class PhotoServicio{

    //public photos: UserPhoto[] = [];

    //private PHOTO_STORAGE: string = 'ganadero/photos';

    private platform: Platform;

    constructor(platform: Platform) {
        this.platform = platform;
    }

    public async addNewToGallery() {
        // Take a photo
        const capturedPhoto = await Camera.getPhoto({
           resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
          quality: 100
        });

        // Save the picture and add it to photo collection
        const fileName = new Date().getTime() + '.jpeg';
        //const savedImageFile = await this.savePicture(capturedPhoto,fileName);
        //this.photos.unshift(savedImageFile);
        /*Storage.set({
          key: this.PHOTO_STORAGE,
          value: JSON.stringify(this.photos),
        });*/
        const file =  await this.convertToFile(capturedPhoto,fileName);
        return file;
      }

      private async convertToFile(photo: Photo, fileName:string){

        const rawData = atob(photo.base64String);
        const bytes = new Array(rawData.length);
        for (let x = 0; x < rawData.length; x++) {
            bytes[x] = rawData.charCodeAt(x);
        }
        const arr = new Uint8Array(bytes);
        const blob = new Blob([arr], {type: 'image/png'});
        const file = new File([blob], fileName, {
          lastModified: new Date().getMilliseconds(),
          type: blob.type,
        });
        return file;
      }

      /* este metodo solo vale si vamos a cargar las fotos desde local
      public async savePicture(photo: Photo,fileName:string) {

        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: photo.base64String,
          directory: Directory.Data
        });

        if (this.platform.is('hybrid')) {
          // Display the new image by rewriting the 'file://' path to HTTP
          // Details: https://ionicframework.com/docs/building/webview#file-protocol
          return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
          };
        }
        else {
          // Use webPath to display the new image instead of base64 since it's
          // already loaded into memory
          return {
            filepath: fileName,
            webviewPath: photo.webPath
          };
        }
      }
      */
      /* este metodo solo vale si vamos a cargar las fotos desde local

      public async loadSaved() {
        // Retrieve cached photo array data
        const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
        this.photos = JSON.parse(photoList.value) || [];

        // Easiest way to detect when running on the web:
        // “when the platform is NOT hybrid, do this”
        if (!this.platform.is('hybrid')) {
          // Display the photo by reading into base64 format
          for (let photo of this.photos) {
            // Read each saved photo's data from the Filesystem
            const readFile = await Filesystem.readFile({
                path: photo.filepath,
                directory: Directory.Data
            });

            // Web platform only: Load the photo as base64 data
            photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
          }
        }
      }*/

}