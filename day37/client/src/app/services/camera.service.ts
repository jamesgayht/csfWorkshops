import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UploadComponent } from '../components/upload.component';
import { Snapshot } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private httpClient: HttpClient) { }

  imageData = ""

  upload(form: any, image: Blob): Promise<Snapshot> {
    
    const formData = new FormData
    formData.set("title", form['title'])
    formData.set("comments", form['comments'])
    formData.set("image", image)

    return firstValueFrom(
      this.httpClient.post<Snapshot>('/upload', formData)
    )
  }

}
