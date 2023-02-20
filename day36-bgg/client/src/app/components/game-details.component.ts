import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game, GameDetails } from '../models/models';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  param$!: Subscription
  gameDetails!: GameDetails

  constructor(private activatedRoute: ActivatedRoute, private gameService: GamesService) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id']
        this.gameService.getGameById(id)
          .then(result => {
            this.gameDetails = result
            console.info('>>> gameDetails', this.gameDetails)
          })
          .catch(error => {
            console.error('>>> error: ', error)
          })
      }
    )
  }

}
