import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskItem, Tasks } from '../models';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  taskItems!: FormArray;
  tasks!: Tasks;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.form = this.createForm(); 
  }

  save() {
    this.tasks = this.form.value as Tasks
    console.info(">>>> TASKS: ", this.tasks);
  }

  public addTask() {
    console.info("Adding Task Item");
    this.taskItems.push(this.createTaskItem());
  }  


  public deleteTask(i: number) {
    console.info("Removing Task Item");
    this.taskItems.removeAt(i); 
  }

  public clearForm() {
    this.form = this.createForm(); 
  }

  private createForm(): FormGroup {
    this.taskItems = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>("", [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>("", [Validators.required, Validators.email]),
      taskItems: this.taskItems
    })
  }

  private createTaskItem(): FormGroup{ 
    return this.fb.group({
      task: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('', [Validators.required]),
      dueDate: this.fb.control<Date>(new Date(),[Validators.required])
    })
  }

}
