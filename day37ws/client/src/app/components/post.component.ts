import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  form!: FormGroup
  @ViewChild('image') imageFile!:ElementRef
  blob!: Blob

  selectedFile!: File
  reader = new FileReader()
  base64!: string

  constructor (private fb: FormBuilder, private uploadService: UploadService) {}

  ngOnInit(): void {
      this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      file: this.fb.control('', [Validators.required]),
      comments: this.fb.control('', [Validators.required])
    })
  }

  uploadPost() {
    console.info(">>> image: ", this.form.get('file')?.value)
    this.blob = this.imageFile.nativeElement.files[0]
    // this.blob = this.form.get('file')?.value
    const value = this.form.value
    
    this.uploadService.upload(value, this.blob)
      .then(result => {
        console.info("results >>>", result)
      })
      .catch(error => {
        console.error("error >>> ", error)
      })

    this.form = this.createForm()
    this.selectedFile = this.imageFile.nativeElement.files[0]
  }

  onFileSelected() {
    this.selectedFile = this.imageFile.nativeElement.files[0];
    console.info("Selected file >>> ", this.selectedFile)
    
    const type = this.selectedFile.type
    console.info("file type >>> ", type)

    this.changeFile(this.selectedFile)
        .then((base64: any): any => {
          // console.info("base64 >>> ", base64)
          this.base64 = base64
        })
    
    this.reader.readAsDataURL(this.selectedFile)
  }

  changeFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); 
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

}
