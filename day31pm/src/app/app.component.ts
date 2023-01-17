import { Component } from '@angular/core';
import { FruitImage } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day31pm';

  fruits = [
    {url: "assets/fruits/apple.png", name: "apple"},
    {url: "assets/fruits/blueberries.png", name: "blueberries"},
    {url: "assets/fruits/broccoli.png", name: "broccoli"},
    {url: "assets/fruits/carrot.png", name: "carrot"},
    {url: "assets/fruits/corn.png", name: "corn"}
  ];

  count = 1;
  items: FruitImage[] = [];


  cartExist: boolean = false; 

  imageClicked(data: FruitImage) {
    this.cartExist = true;  
    console.info(`Cart items >>> `, data);
    
    if(this.items.length < 1) {
      this.items.push(data); 
      console.info(`HERE >>> `, this.items)
    }
    else {
      for(let i=0; i < this.items.length; i++) {
        if(this.items[i].imageName === data.imageName) {
          this.items[i].imageCount++; 
          data.imageCount = this.items[i].imageCount;
          this.items[i] = data;
          console.log(`adding new count to current `, this.items[i].imageName, this.items[i].imageCount);
        }
        else {
          this.items.push(data);
          console.info(`Pushing new data into items`, data);
        }
      }

    }
  }

  addToCartItems(data: FruitImage) {
    console.info(`Cart items >>> `, data);
    if(!this.items.includes(data)) {
      console.info(`HERE >>> `, this.items)
      this.items.push(data); 
    }
    else {
      data.imageCount += this.count; 
      console.info(`DATA >>> `, data)
    }
    
  }

  




}
