import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, Todo } from '../models';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  formGroup!: FormGroup
  formArray!: FormArray
  todo: Task[] = []

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.createForm()
    console.info(">>> Creating form <<<")
  }

  private createForm(task: Task|null = null): FormGroup {
    // this.formArray =  this.createTodo(todo?.tasks? todo.tasks: [])
    return this.fb.group({
      description: this.fb.control(task?.description? task.description: '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control(task?.priority? task.priority: '', [Validators.required]),
      due: this.fb.control(task?.due? task.due: new Date(), [Validators.required])
      // tasks: this.formArray
    })
  }

  private createTodo(todo: Task[] = []): FormArray {
    console.info(">>> creating ToDo <<<")
    return this.fb.array(
      todo.map(t => this.createTask(t))
    )
  }

  private createTask(task: Task|null = null): FormGroup {
    console.info(">>> creating task <<<")
    return this.fb.group({
      description: this.fb.control(task?.description? task.description: '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control(task?.priority? task.priority: '', [Validators.required]),
      due: this.fb.control(task?.due? task.due: new Date(), [Validators.required])
    })
  }

  public addTask() {
    
  }

}
