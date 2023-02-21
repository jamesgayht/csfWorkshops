import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  upload(form: any, image: Blob): Promise<string> {

    const formData = new FormData()
    formData.set('file', image)
    formData.set('comments', form['comments'])

    console.info("formData >>> ",formData.get('file'))
    console.info("formData >>> ",formData.get('comments'))

    return firstValueFrom(
      this.httpClient.post<string>('/uploadNG', formData)
    )
  }

}
