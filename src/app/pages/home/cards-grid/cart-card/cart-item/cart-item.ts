import { Component, input, output } from '@angular/core';
import { Game } from '../../../../../models/game';
import { CurrencyPipe } from '@angular/common';
import { PlatformTag } from "../../../../../shared/platform-tag/platform-tag/platform-tag";

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, PlatformTag],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  game = input.required<Game>()
  removeItem = output<Game>()

  removingItem(){
    this.removeItem.emit(this.game())
    
  }
}
