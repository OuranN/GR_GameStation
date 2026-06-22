import { Component, computed, inject, input, output, signal } from '@angular/core';

import { CartItem } from "./cart-item/cart-item";
import { CurrencyPipe } from '@angular/common';
import { WhatsappService } from '../../../../services/whatsapp/whatsapp';
import { Game } from '../../../../models/game';


@Component({
  selector: 'app-cart-card',
  imports: [CartItem, CurrencyPipe],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.css',
})
export class CartCard {
  order = input.required<Game[]>();
  isModalOpen = signal(false);
  removeItem = output<Game>();
  orderDone = output<void>();
  whatsappService = inject(WhatsappService);

  total = computed(()=> {
    return this.order().reduce((total, game) => total + game.preco, 0);
  })

  removingItem(game:Game){
    this.removeItem.emit(game)
  }

  sendMensage(){
    
    this.whatsappService.sendWhatsApp(this.order(), this.total());
    
    setTimeout(() => {
    this.orderDone.emit();
    
  }, 1000);
    
  }

  openModal(){
    this.isModalOpen.set(true)
  }

  closeModal(){
    this.isModalOpen.set(false)
  }
}
