import { Component, OnInit } from '@angular/core';
import { Game } from '../models/models';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = []

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getGames()
      .then(games => {
        this.games = games
        console.info(">>> games: ", this.games)
      })
      .catch(error => {
        console.error(">>> error: ", error)
      })
  }

}
