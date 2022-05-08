import { Injectable } from '@angular/core';
import { ConexionGenericaService } from './conexionGenerica.service';
import { IEFileUpload } from './beans/interfaces/fileUpload.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConexionGenericaFilesService extends ConexionGenericaService<IEFileUpload> {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    super(db);
  }

  pushFileToStorage(fileUpload: IEFileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

}