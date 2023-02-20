import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  @ViewChild('image') imageFile!: ElementRef
  form!: FormGroup
  blob!: Blob

  constructor(private fb: FormBuilder, private postSerivce: PostService) {}

  ngOnInit(): void {
    this.form = this.createForm()  
  }

  processForm() {
    console.info(">>> image: ", this.form.get('image')?.value)
    const value = this.form.value

    // this.postSerivce.upload(value, this.imageFile.nativeElement.files[0])
    this.postSerivce.upload(value, this.blob)
      .then(result => {
        console.info(">>> result: ", result)
      })
      .catch(error => {
        console.error(">>> error: ", error)
      })

    // const formData = new FormData()
    // formData.set('image', this.form.get('image')?.value)
    // formData.set('title', this.form.get('title')?.value)
    // formData.set('comments', this.form.get('comments')?.value)
    // formData.set('imageFile', this.imageFile.nativeElement.files[0])
    
    // console.info("formData >>> ",formData.get('image'))
    // console.info("formData >>> ",formData.get('imageFile'))
    // console.info("formData >>> ",formData.get('title'))
    // console.info("formData >>> ",formData.get('comments'))
  }

  selectedFile!: File
  reader = new FileReader()
  base64!: string

  onFileSelected() {
    this.selectedFile = this.imageFile.nativeElement.files[0];
    console.info("selected file >>> ", this.selectedFile)
  
    const type = this.selectedFile.type
    
    this.changeFile(this.selectedFile)
    .then((base64: any): any => {
      console.info("base 64 >>>", base64)
        this.base64 = base64
    })

    this.reader.readAsDataURL(this.selectedFile);
  }

  changeFile(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

  private createForm(): FormGroup {
    return this.fb.group({
      image: this.fb.control('', [Validators.required]),
      title: this.fb.control('', [Validators.required]),
      comments: this.fb.control('', [Validators.required])
    })
  }
  

}
