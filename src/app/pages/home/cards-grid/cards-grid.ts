import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CardItem } from './card-item/card-item';
import { CartCard } from "./cart-card/cart-card";
import { Filter } from './filter/filter';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-cards-grid',
  imports: [CardItem, CartCard, Filter],
  templateUrl: './cards-grid.html',
  styleUrl: './cards-grid.css',
})
export class CardsGrid implements OnInit {
  private gameService = inject(GameService)
  games = signal<Game[]>([])
  order = signal<Game[]>([]);
  plataformaFiltro = signal('');
  searchTerm = signal('');

  gamesFiltrados = computed(() => {
    const termo = this.searchTerm().trim().toLowerCase();
    const plataforma = this.plataformaFiltro().toLowerCase();

    return this.games().filter(game => {
      const plataformaValida =
        !plataforma ||
        plataforma === 'all' ||
        game.plataforma.toLowerCase() === plataforma;

      const nomeValido = !termo || game.nome.toLowerCase().includes(termo);

      return plataformaValida && nomeValido;
    });
  });

  setPlatformFilter(platform: string) {
    this.plataformaFiltro.set(platform);
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  addToCart(game:Game){
    if(this.order().includes(game)){
     this.order.update(order =>
        order.filter(g => g.id !== game.id)
      );
     return
    }
      this.order.update(order => [...order, game]);
  }

  removeToCart(game:Game){
    this.order.update(order =>
        order.filter(g => g.id !== game.id)
      );
  }

  cleanCart(){
    this.order.set([])
  }

  async ngOnInit() {
    this.gameService.listenGames((games) => {
      this.games.set(games);
    });

  }
}


