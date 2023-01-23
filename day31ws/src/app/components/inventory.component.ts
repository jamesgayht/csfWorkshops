import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { INVENTORIES } from '../constant';
import { CustomerSelection, Inventory } from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  
  @Output() 
  onSelection = new Subject<CustomerSelection>()
  
  inventoryTitle = "Your inventory:"
  
  inventories: Inventory[] = INVENTORIES; 
  
  index!: number

  selected(imageUrl: string, description: string, quantity: number, index: number) {
    const selection = {
      imageUrl,
      description,
      quantity,
      index
    } as CustomerSelection 
    this.onSelection.next(selection)
    console.info(">>> IDX: ", index)
  }

  addTo(i: number, inventory: Inventory) {
    inventory.quantity += i
  }

  removeFrom(i: number, inventory: Inventory) {
    inventory.quantity += i
  }

}
