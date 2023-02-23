import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character } from '../models/models';
import { CharactersService } from '../services/characters.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  
  param$!: Subscription
  character!: string
  characters: Character[] = []

  charactersPerPage = 20
  currentIndex: number = 0
  currentPage: number = 1

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchService, private characterService: CharactersService) {}

  ngOnInit(): void {
      this.param$ = this.activatedRoute.params.subscribe(
        params => {
          this.character = params['character']
          console.info("character in charactersComp >>> ", this.character)
          this.searchService.getCharacters(this.character).then(results => {
            this.characters = results
            console.info("search characters >>> ", this.characters)
            this.characterService.characters = this.characters
          })
          .catch(error => {
            console.error("error >>> ", error)
          })
        }
      )
  }

  ngOnDestroy(): void {
      this.param$.unsubscribe()
      console.info(">>> unsubbed <<<")
  }

  nextPage() {
    this.currentPage++ 
    this.currentIndex = this.currentIndex + this.charactersPerPage
    
    console.info("charactersPerPage >>> ", this.charactersPerPage)
    console.info("currentIndex >>> ", this.currentIndex)

    this.searchService.getCharactersLimitOffset(this.character, this.charactersPerPage, this.currentIndex).subscribe(results => {
      console.info("NEXT >>> ", results)
      this.characters = results
    })
  }

  previousPage() {
    this.currentPage--
    this.currentIndex -= this.charactersPerPage
    this.searchService.getCharactersLimitOffset(this.character, this.charactersPerPage, this.currentIndex).subscribe((result) => {
      console.info("PREVIOUS >>> ", result)
      console.info("currentPage >>> ", this.currentPage)
      this.characters = result
    })
  }

}
