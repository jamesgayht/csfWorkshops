import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from '../models/Game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input()
  gamesPerPage!: number
  currentIndex: number = 0
  model = new Game('', 0, 0)
  games: Game[] = []
  currentPage: number = 1;

  constructor(private gameService: GameService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.info("Changes >>> ", changes)
    console.info("Changes Games Per Page >>> ", changes['gamesPerPage'].currentValue)

    if(changes['gamesPerPage'].currentValue == null) {
      this.gamesPerPage = 10
    }
    else {
      this.gamesPerPage = changes['gamesPerPage'].currentValue
    }

    this.gameService.getGameResults(this.gamesPerPage, this.currentIndex).subscribe((results) => {
      console.info("In changes, RESULTS >>> ", results)
      this.games = results.games
    })

  }

  ngOnInit(): void {
    console.info(">>> gamesPerPage: ", this.gamesPerPage)
    if (this.gamesPerPage == null) {
      this.gamesPerPage = 10
      console.info(">>> gamesPerPage in if statement: ", this.gamesPerPage)
    }

    this.gameService.getGameResults(this.gamesPerPage, this.currentIndex).subscribe((result) => {
      console.info("result >>> ", result)
      console.info("gamesPerPage >>> ", this.gamesPerPage)
      console.info("currentIndex >>> ", this.currentIndex)
      this.games = result.games
      console.info("GAMES >>> ", this.games)
    })
    
  }
  
  nextPage() {
    this.currentPage++
    this.currentIndex = this.currentIndex + this.gamesPerPage
    console.info("gamesPerPage >>> ", this.gamesPerPage)
    console.info("currentIndex >>> ", this.currentIndex)
    this.gameService.getGameResults(this.gamesPerPage, this.currentIndex).subscribe((result => {
      console.info("NEXT >>> ", result)
      this.games = result.games
    }))
  }

  previousPage() {
    this.currentPage--
    this.currentIndex -= this.gamesPerPage
    this.gameService.getGameResults(this.gamesPerPage, this.currentIndex).subscribe((result) => {
      console.info("PREVIOUS >>> ", result)
      console.info("currentPage >>> ", this.currentPage)
      this.games = result.games
    })
  }

}
