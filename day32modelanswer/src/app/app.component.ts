import { Component, OnInit } from '@angular/core';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  todo: Todo|null = null; 
  
  ngOnInit(): void { 
    const jsonString = localStorage.getItem('todo')
    if(!!jsonString)
      this.todo = JSON.parse(jsonString)
  }

  processNewTodo(todo: Todo) {
    const jsonString = JSON.stringify(todo)
    localStorage.setItem("todo", jsonString)
    console.info(">>> Saving info to local storage <<<", jsonString)
  }

  

}
