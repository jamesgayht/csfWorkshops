import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Task, Todo } from '../models';
import { DatePipe } from '@angular/common';
import { DateValidatorComponent } from './date-validator.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  formGroup!: FormGroup
  formArray!: FormArray
  todo: Task[] = []
  completed: Task[] = []

  constructor(private fb: FormBuilder, public datepipe: DatePipe) {}

  ngOnInit(): void {
    this.formGroup = this.createForm()
    console.info(">>> Creating form <<<")
  }

  @Output()
  onClick = new Subject<Task>();

  processForm() {
    const task = this.formGroup.value as Task
    console.info(">>>> TASK: ", task)
    this.onClick.next(task)
    // this.todo.push(task)

  }

  date: Date = new Date()
  dateFormatted = this.datepipe.transform(this.date, 'yyyy-MM-dd')

  private createForm(task: Task|null = null): FormGroup {
    // this.formArray =  this.createTodo(todo?.tasks? todo.tasks: [])
    return this.fb.group({
      description: this.fb.control(task?.description? task.description: '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control(task?.priority? task.priority: '', [Validators.required]),
      due: this.fb.control(task?.due? task.due: this.dateFormatted, [Validators.required])
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
      due: this.fb.control(task?.due? task.due: this.dateFormatted, [Validators.required, DateValidatorComponent.greaterThan()])
    })
  }

  deleteTask(index: number) {
    console.info(">>> index: ", index)
    this.todo.splice(index, 1)
    console.info(">>> Removing & updating todo <<<")
    console.info(">>>> updated todo: ", this.todo)
  }

  deleteCompleted(index: number) {
    console.info(">>> index: ", index)
    this.completed.splice(index, 1)
    console.info(">>> Removing & updating completed <<<")
    console.info(">>>> updated todo: ", this.completed)
  }

  completedTask(index: number) {
    this.completed.push(this.todo[index])
    console.info("Completed >>> ", this.completed)
    this.todo.splice(index, 1)
    console.info(">>>> updated todo: ", this.todo)
  }

  showEdit: boolean = false
  editIndex!: number
  editTask(index: number) {
    this.editIndex = index
    this.showEdit = true
  }

  updateTask(index: number, value: string) {
    console.info("event.target.value >>> ", value)
    this.todo[index].description = value
  }

}
