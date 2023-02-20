import { HttpClient } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PostService {

    constructor(private httpClient: HttpClient) {}

    upload(form: any, image: Blob): Promise<string> {

        const formData = new FormData()
        formData.set('image', form['image'])
        formData.set('title', form['title'])
        formData.set('comments', form['comments'])  
        formData.set('imageFile', image)
        
        console.info("formData >>> ",formData.get('image'))
        console.info("formData >>> ",formData.get('imageFile'))
        console.info("formData >>> ",formData.get('title'))
        console.info("formData >>> ",formData.get('comments'))

        return firstValueFrom(
            this.httpClient.post<string>('/upload', formData)
        )
    }

}