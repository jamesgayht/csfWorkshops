import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '../models/models';
import { CharactersService } from '../services/characters.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  form!: FormGroup
  character: Character = this.charactersService.selectedCharacter
  comment!: string

  constructor(private fb: FormBuilder, private charactersService: CharactersService, private postService: PostService, private router: Router) {}

  ngOnInit(): void {
      this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({ 
      comment: this.fb.control('', [Validators.required])
    })
  }

  postComment() {

    this.comment = this.form.get('comment')?.value
    console.log("comment >>> ", this.comment)

    this.postService.postComment(this.character.id, this.comment).then(response => {
      console.log("response >>> ", response)
    }).catch(error => {
      console.error("error >>> ", error)
    })

    this.router.navigate(['/character', this.character.id])

  }

}
