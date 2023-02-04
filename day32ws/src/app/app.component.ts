import { Component } from '@angular/core';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks: Task[] = []

  addTask(task: Task) {
    console.info(">>> Task: ", task)
    this.tasks.push(task)
    console.info(">>> Tasks Array: ", this.tasks)
  }

}
