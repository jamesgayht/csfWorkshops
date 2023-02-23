import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!: FormGroup

  constructor(private fb: FormBuilder, private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
      this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      character: this.fb.control<string>('', [Validators.required]) 
    })
  }

  search() {
    const character = this.form.get('character')?.value
    console.info("character >>> ", character)
    // this.searchService.getCharacters(character)
    this.router.navigate(['/characters', character])   

    console.info("characters >>> ", this.searchService.getCharacters(character))
  }
}
