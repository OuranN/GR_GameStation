import { Component, inject, input, output, signal } from '@angular/core';
import { Game } from '../../../../models/game';
import { GameService } from '../../../../services/game/game.service';
import { PlatformTag } from "../../../../shared/platform-tag/platform-tag/platform-tag";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-game-item',
  imports: [PlatformTag, CurrencyPipe],
  templateUrl: './game-item.html',
  styleUrl: './game-item.css',
})
export class GameItem {
  game = input.required<Game>();
  editGame = output<Game>();
  selected = input.required<boolean>();
  
  private gameService = inject(GameService);

  onDeleteGame(){
    this.gameService.deleteGame(this.game().id!);
  }

  onEditGame(){
    this.editGame.emit(this.game());
  }
}
