import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  @Input() 
  tasks: Task[] = []
  
  @Input()
  completedTasks: Task[] = []
  
  formGroup!: FormGroup

  @Output()
  processEdit = new Subject<Task[]>()

  @Output()
  processCompleted = new Subject<Task[]>()

  constructor(private fb: FormBuilder, public datepipe: DatePipe) {}

  ngOnInit(): void {
      this.formGroup = this.createForm()
  }

  date: Date = new Date()
  dateFormatted = this.datepipe.transform(this.date, "yyyy-MM-dd")

  createForm(task: Task|null = null): FormGroup {
    return this.fb.group({
      description: this.fb.control(task?.description? task.description: '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control(task?.priority? task.priority: '', [Validators.required]),
      due: this.fb.control(task?.due? task.due: this.dateFormatted, [Validators.required])
    })
  }

  deleteTask(index: number) {
    console.info(">>> Deleteing task <<<")
    this.tasks.splice(index, 1)
    console.info("updated task >>> ", this.tasks)
    this.processEdit.next(this.tasks)
  }

  hideCompletedTask(index: number) {
    this.completedTasks.push(this.tasks[index])
    this.tasks.splice(index, 1)
    console.info("Completed task >>> ", this.completedTasks)
    console.info("updated task >>> ", this.tasks)
    this.processEdit.next(this.tasks)
    this.processCompleted.next(this.completedTasks)
  }

  editTask: boolean = false
  editTaskIndex!: number
  showEditTask(index: number) {
    this.editTask = true
    this.editTaskIndex = index
    console.info(">>> Editing task <<<")
   }

   processUpdate() {
    console.info(">>> processing update <<<")
    const task = this.formGroup.value as Task
    console.info(">>> updated Task: ", task)
    this.tasks.splice(this.editTaskIndex, 1, task)
    this.editTask = false
    this.processEdit.next(this.tasks)
   }
}
