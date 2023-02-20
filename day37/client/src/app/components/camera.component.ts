import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {

  form!: FormGroup
  showWebCam: boolean = false;
  private trigger: Subject<void> = new Subject<void>()
  webcamImage!: WebcamImage 

  height: number = 400
  width: number = 400

  constructor(private router: Router, private cameraService: CameraService) {}

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  triggerSnapshot() {
    console.info("Snapping your shot!")
    this.trigger.next()
  }

  handleWebcamImage(webcamImage: WebcamImage) {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage
  }

  startSnapping() {
    console.info(">>> Starting webcam <<<")
    this.showWebCam = true
  }

  stopSnapping() {
    console.info(">>> Stopping webcam <<<")
    this.showWebCam = false
  }
}
