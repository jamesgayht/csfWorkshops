import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactRepository } from './contact.repository';
import { Contact } from './models';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form!: FormGroup

  contacts: Contact[] = []

  constructor(private fb: FormBuilder, private contactRepo: ContactRepository, private uploadService: UploadService) { }

  async ngOnInit() {
    this.form = this.createForm()
    return this.contacts = await this.contactRepo.getAllContacts()
  }

  processForm() {
    console.info(">>> processing form <<< ")
    this.upload()
  }

  upload() {
    const value = this.contacts

    console.info(">>> value: ", value)
    this.uploadService.upload(value)
    
    // .then(result => {
    //   console.info(">>> key:", result.key)
    // })
    // .catch(error => {
    //   console.info(">>> error: ", error)
    // })

  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control(''),
      email: this.fb.control('')
    })
  }

  async addContact() {
    const contact = this.form.value as Contact
    console.info(">>> contact: ", contact)
    try {
      // awaits the promise, before returning the key 
      const k = await this.contactRepo.addContact(contact)
      console.info(">>> k: ", k)

      this.contacts = await this.contactRepo.getAllContacts()
      console.info("all contacts >>> ", this.contacts)

    } catch (error) {
      console.error(">>> error: ", error)
    }
  }

  // addContact() {
  //   const contact = this.form.value as Contact
  //   console.info(">>> Contact: ", contact)
  //   this.contactRepo.addContact(contact).then(
  //     v => {
  //       console.info(">> v:", v)
  //     }
  //   )
  //     .catch(error => {
  //       console.error("error >>> ", error)
  //     })
  // }



}
