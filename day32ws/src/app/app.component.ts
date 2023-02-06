import { Component, OnInit } from '@angular/core';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasks: Task[] = []
  completedTasks: Task[] = []
  // task: Task|null = null

  ngOnInit(): void {
    const jsonString = localStorage.getItem('tasks')
    if (!!jsonString) {
      console.info("truthy/falsy >>> ", !!jsonString)
      this.tasks = JSON.parse(jsonString)
      console.info("tasks on init >>> ", this.tasks)
    }
    
    const jsonStringCompleted = localStorage.getItem('completed tasks')
    if(!!jsonStringCompleted) {
      this.completedTasks = JSON.parse(jsonStringCompleted)
    }
  }

  processNewTask(task: Task) {
    const jsonString = JSON.stringify(task)
    localStorage.setItem("task", jsonString)
    console.info("Saving into local storage >>> ", jsonString)
  }

  addToLocalStorage(tasks: Task[], key: string) {
    const jsonString = JSON.stringify(tasks)
    console.info("Saving into local storage >>> ", jsonString)
    localStorage.setItem(key, jsonString)
  }

  editTask(editedTasks: Task[]) {
    console.info(">>> Edited Tasks: ", editedTasks)
    this.tasks = editedTasks
    console.info(">>> Updated Tasks: ", this.tasks)

    this.addToLocalStorage(this.tasks, "tasks")
  }

  completeTask(cTasks: Task[]) {
    console.info(">>> Completed Task: ", cTasks)
    this.completedTasks = cTasks
    console.info(">>> Adding to localstorage Completed Tasks Array: ", this.completedTasks)
    this.addToLocalStorage(this.completedTasks, "completed tasks")
  }

  addTask(task: Task) {

    // add to task array 
    console.info(">>> Task: ", task)
    this.tasks.push(task)
    console.info(">>> Tasks Array: ", this.tasks)

    // add to local storage
    this.addToLocalStorage(this.tasks, "tasks")
  }

}
