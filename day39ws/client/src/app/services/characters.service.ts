import { Injectable } from '@angular/core';
import { Character } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor() { }

  characters: Character[] = []

  selectedCharacter!: Character
  
}
