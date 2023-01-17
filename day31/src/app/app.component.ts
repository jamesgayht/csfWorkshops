import { Component } from '@angular/core';
import { MyImage } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'day31';
  image = "/assets/gr2.jpeg"
  widthCom = 600;

  grImages = [
    "/assets/gr.jpeg",
    "/assets/gr2.jpeg"
  ]

  imageClicked(data: MyImage) {
    console.info(`image clicked:` + data);
    console.log("HELLO");
  }
}
