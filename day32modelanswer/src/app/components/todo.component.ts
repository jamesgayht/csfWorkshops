import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  taskArray!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

  }
  
  addTask() {
    this.taskArray.push(this.createTask); 
  }

  public createTask(task: Task|null = null) {
    return this.fb.group({
      task: this.fb.control(task?.task? task.task: '', [Validators.required]),
      priority: this.fb.control(task?.priority? task.priority: '', [Validators.required]),
      date: this.fb.control(task?.dueDate? task.dueDate: new Date(), [Validators.required])
    })
  }

}
