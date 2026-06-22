import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { GameItem } from "./game-item/game-item";
import { GAMES } from '../../../data/games';
import { GameService } from '../../../services/game/game.service';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-game-list',
  imports: [GameItem],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList implements OnInit {
  private gamesService = inject(GameService)
  games = signal<Game[]>([]);
  nJogos = signal(0)
  editGame = output<Game>()
  selectedGame = input.required<Game|undefined>()

  ngOnInit(){

    this.gamesService.listenGames((games) => {
      this.games.set(games);
      this.nJogos.set(this.games().length)
    })

  }

  onEditGame(game:Game){
    this.editGame.emit(game);
  }
}
