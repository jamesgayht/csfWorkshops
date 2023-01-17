import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MyImage } from '../model';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent {

  @Input() //input allows passing in values in html e.g. [imageURL] = <xxx>; 
  imageURL = "/assets/gr.jpeg";

  imageBURL = "/assets/gr2.jpeg";

  @Input()
  width = 500;

  // creating an event 
  @Output()
  // onClicked = new Subject<string>() 
  onClicked = new Subject<MyImage>() 

  counter = 10;

  //  defining a method
  imageClicked() {
    console.info("image clicked", this.imageURL, this.width);
    // fire the event with the next keyword
    // this.onClicked.next(this.imageURL); // for string
    const img: MyImage = {
      imageName: this.imageURL,
      size: this.width
    }

  }

  imageIncrease() {
    console.info("button clicked, increasing size"); 
    this.width += 10;
  }

  imageDecrease() {
    console.info("button clicked, increasing size"); 
    this.width -= 10;
  }

  resize(vw: number) {
    this.width += vw; 
  }
}
