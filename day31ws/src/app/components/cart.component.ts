import { Component, Input } from '@angular/core';
import { Inventory } from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Input()
  cart: Inventory[] = [];

  clicks: number = 0; 

  count(inventory: string) {
    
    const invLength = this.cart.filter (v => v.imageURL == inventory)
    this.clicks = invLength.length;
  }

}
