import { Injectable } from '@angular/core';
import { ConexionGenericaService } from './conexionGenerica.service';
import { IEFileUpload } from './beans/interfaces/fileUpload.interface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, finalize } from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ConexionGenericaFilesService extends ConexionGenericaService<IEFileUpload> {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    super(db);
  }

  pushFileToStorage(fileUpload: IEFileUpload): Observable<number> {
    const filePath = `${this.nameCollection}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          //this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();

 }

}