import { Component } from '@angular/core';
import { INVENTORIES } from './constant';
import { Inventory } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  content: Inventory[] = [];

  select(inventory: string) {
    console.info(`app.component select >>> `, inventory);
    // filter returns an array
    const inv = INVENTORIES.filter (v => v.imageURL == inventory)
    this.content.push(inv[0])
  }

}
