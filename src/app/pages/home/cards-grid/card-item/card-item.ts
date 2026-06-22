import { Component, input, output } from '@angular/core';
import { Game } from '../../../../models/game';
import { PlatformTag } from "../../../../shared/platform-tag/platform-tag/platform-tag";
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-card-item',
  imports: [PlatformTag, CurrencyPipe],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css',
})
export class CardItem {
  game = input.required<Game>();
  addGameOrder = output<Game>();
  isInCart = input.required<boolean>();

  toggleGameCart(){
    this.addGameOrder.emit(this.game())
  }

}
