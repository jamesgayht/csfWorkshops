import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  @Input()
  tasks: Task[] = []
  completedTasks: Task[] = []
  formGroup!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.formGroup = this.createForm()
  }

  createForm(task: Task|null = null): FormGroup {
    return this.fb.group({
      description: this.fb.control(task?.description? task.description: '', [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control(task?.priority? task.priority: '', [Validators.required]),
      due: this.fb.control(task?.due? task.due: new Date(), [Validators.required])
    })
  }

  deleteTask(index: number) {
    console.info(">>> Deleteing task <<<")
    this.tasks.splice(index, 1)
    console.info("updated task >>> ", this.tasks)
  }

  hideCompletedTask(index: number) {
    this.completedTasks.push(this.tasks[index])
    this.tasks.splice(index, 1)
    console.info("Completed task >>> ", this.completedTasks)
    console.info("updated task >>> ", this.tasks)
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
   }
}
