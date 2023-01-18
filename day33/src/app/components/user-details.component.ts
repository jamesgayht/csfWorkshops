import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserDetail } from '../models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  @Output()
  onUserDetail = new Subject<UserDetail>()

  form!:FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.form = this.createForm(); 
  }

  getFormValue(): UserDetail {
    return this.form.value as UserDetail
  }

  processForm() {
    const userDetail: UserDetail = this.form.value as UserDetail
    console.info("User Details >>>> ", userDetail)
    this.onUserDetail.next(userDetail)
    this.form = this.createForm()
  }

  private createForm() {
    return this.fb.group({
      name: this.fb.control(''),
      email: this.fb.control(''),
      comments: this.fb.control(''),
    })
  }
  

}
