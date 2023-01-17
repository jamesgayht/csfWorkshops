import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FruitImage } from '../model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  @Input()
  imageURL = "assets/fruits/apple.png"; 

  @Input()
  imageCount = 1;

  @Input()
  fruitName = "apple";

  @Output()
  onClick = new Subject<FruitImage>() 
  
  imageClicked() {
    const fruit: FruitImage = {
      fruitImage: this.imageURL, 
      imageName: this.fruitName,
      imageCount: this.imageCount
    }
    console.log("fruit image >>> " + this.imageURL + " " + this.imageCount)
    this.onClick.next(fruit); 
  }



}
