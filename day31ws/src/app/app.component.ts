import { Component } from '@angular/core';
import { CustomerSelection } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  content: CustomerSelection[] = []
  indexArr: number[] = []

  select(selection: CustomerSelection) {
    console.info(">>> customer select: ", selection)

    if(!this.indexArr.includes(selection.index)) {
      this.content.push(selection)
      this.indexArr.push(selection.index)
    }
    else {
      
      selection.quantity += this.content[this.indexArr.indexOf(selection.index)].quantity

      console.info(">>>> selection quantity: ",selection.quantity)

      this.content[this.indexArr.indexOf(selection.index)] = selection
      
    }

    console.info(" >>> TOTAL CONTENT: ", this.content)
  }

  delete(i: number) {
    console.info(">>> DELETING ITEM: ", this.content[i])
    console.info(`this.content[${i}]:`, this.content[i])
    console.info(`this.indexArr[${i}]:`, this.indexArr[i])
    this.content.splice(i, 1)
    this.indexArr.splice(i, 1)
  }

}
