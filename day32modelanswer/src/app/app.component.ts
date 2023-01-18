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

  }

  processNewTodo(todo: Todo) {
    const jsonString = JSON.stringify(todo)
    console.info(">>> Saving info to local storage <<<", jsonString)
    localStorage.setItem("todo", jsonString)
  }

  

}
