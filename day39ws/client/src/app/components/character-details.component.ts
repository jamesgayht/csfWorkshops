import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, Comment } from '../models/models';
import { CharactersService } from '../services/characters.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  
  param$!: Subscription
  id!: number
  characters: Character[] = []
  character!: Character
  comments: Comment[] = []

  constructor (private activatedRoute: ActivatedRoute, private characterService: CharactersService, private postService: PostService) {}

  ngOnInit(): void {
      this.param$ = this.activatedRoute.params.subscribe(params => {
        this.id = params['id']
        console.info("id >>> ", this.id)
        this.characters = this.characterService.characters
        
        this.characters.filter(c => {
          console.info("c >>> ", c)
          if(c.id == this.id) {
            this.character = c
            // console.info("char >>> ", this.character)
            this.characterService.selectedCharacter = this.character
          } 
        })

        this.postService.getComments(this.id)
          .then(result => {
            console.info("result >>> ", result)
            this.comments = result
          }) 
          .catch(error => {
            console.error(">>> error: ", error)
          }) 
      })
  }

  ngOnDestroy(): void {
      console.info(">>> destroying <<<")
      this.param$.unsubscribe()
  }

}
