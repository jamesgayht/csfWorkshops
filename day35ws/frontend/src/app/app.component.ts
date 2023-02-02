import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  form!: FormGroup
  noOfGamesPerPage!: number
  gamesPerPage: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      noOfGamesPerPage: this.fb.control<number>(10, [Validators.required])
    })
  }

  newNoOfGamesPerPage() {
    this.noOfGamesPerPage = this.form.value["noOfGamesPerPage"]
    console.info("newNoOfRecPerPage >>> ", this.noOfGamesPerPage)
  }

}
