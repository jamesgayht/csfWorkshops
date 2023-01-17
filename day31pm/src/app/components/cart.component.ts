import { Component, Input } from '@angular/core';
import { FruitImage } from '../model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Input()
  cartImageUrl = "assets/fruits/apple.png";

  @Input()
  cartImageCount = 1;

  @Input()
  cartFruitName = "apple";

  cartItems = []; 
  addToCartItems(data: FruitImage) {
    this.cartImageUrl = data.fruitImage,
    this.cartFruitName = data.imageName,
    this.cartImageCount++;
  }


}
