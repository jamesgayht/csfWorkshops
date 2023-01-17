import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // dependency injection for NG, similar to autowiring 
  // fb: FormBuilder;
  // constructor(fb: FormBuilder) {
  //   this.fb = fb; 
  // }

  // this ! removes the red squiggly
  form!: FormGroup;
  lineItems!: FormArray;

  // this is equivalent to the code on top 
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    // build the form 
    this.form = this.createForm();
  }

  process() {
    const order: Order = this.form.value as Order;
    console.info(">>>> form: ", order);
  }

  clearForm() {
    // clear the form
    // this.form.reset();

    // creates a brand new form
    // sometimes its easier just to create a new form because you might have many controls/groups to clear
    this.form = this.createForm();
    console.info(">>> clearing the form <<<");
  }

  addItem() {
    this.lineItems.push(this.createLineItem()); 
  }

  deleteItem(i: number) {
    this.lineItems.removeAt(i);
  }

  private createForm(): FormGroup {
    this.lineItems = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>("", [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>("", [Validators.required, Validators.email]),
      rush: this.fb.control<boolean>(false),
      //the angle brackets are generics 
      lineItems: this.lineItems
    })
  }

  private createLineItem(): FormGroup{
    return this.fb.group({
      item: this.fb.control<string>("", [Validators.required]),
      quantity: this.fb.control<number>(1, [Validators.required, Validators.min(1), Validators.max(100)])
    })
  }

}
