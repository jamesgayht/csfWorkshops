import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Contact, UploadData } from "./models";

@Injectable()
export class UploadService {
    
    uploadData = ""

    constructor(private httpClient: HttpClient) {}

    upload(contacts: Contact[]) {

        return firstValueFrom(
            this.httpClient.post('/upload', contacts)
        )
    }

}