import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CardItem } from './card-item/card-item';
import { CartCard } from "./cart-card/cart-card";
import { Filter } from './filter/filter';
import { Game } from '../../../models/game';
import { GameService } from '../../../services/game/game.service';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

const PAGE_SIZE = 12;

@Component({
  selector: 'app-cards-grid',
  imports: [CardItem, CartCard, Filter],
  templateUrl: './cards-grid.html',
  styleUrl: './cards-grid.css',
})
export class CardsGrid implements OnInit {
  private gameService = inject(GameService);

  // --- Jogos da página atual (paginação servidor) ---
  private serverGames = signal<Game[]>([]);

  // --- Todos os jogos (carregados quando filtro está ativo) ---
  private allGames = signal<Game[]>([]);

  isLoading = signal(false);

  currentPage = signal(1);
  totalServerGames = signal(0);   // total real no Firestore (sem filtro)
  pageSize = PAGE_SIZE;

  // Cursores do Firestore por página (índice = número da página, null = início)
  private pageCursors: Array<QueryDocumentSnapshot<DocumentData> | null> = [null];

  // --- Filtros e carrinho ---
  order = signal<Game[]>([]);
  plataformaFiltro = signal('');
  searchTerm = signal('');

  // --- Modo de paginação: 'server' ou 'client' ---
  private paginationMode = signal<'server' | 'client'>('server');

  // Verdadeiro quando qualquer filtro está ativo
  isFiltered = computed(() => {
    const termo = this.searchTerm().trim();
    const plat  = this.plataformaFiltro();
    return !!termo || (!!plat && plat !== '' && plat !== 'all');
  });

  // --- Lista filtrada completa (sobre allGames, usada no modo client) ---
  private filteredGames = computed(() => {
    const termo     = this.searchTerm().trim().toLowerCase();
    const plataforma = this.plataformaFiltro().toLowerCase();

    return this.allGames().filter(game => {
      if (game.estoque <= 0) return false;

      const plataformaValida =
        !plataforma ||
        plataforma === 'all' ||
        game.plataforma.toLowerCase() === plataforma;

      const nomeValido = !termo || game.nome.toLowerCase().includes(termo);

      return plataformaValida && nomeValido;
    });
  });

  // --- Jogos exibidos no grid (depende do modo) ---
  displayedGames = computed(() => {
    if (this.paginationMode() === 'client') {
      const page  = this.currentPage();
      const start = (page - 1) * this.pageSize;
      return this.filteredGames().slice(start, start + this.pageSize);
    }
    // Modo server: jogos da página já vêm filtrados por estoque no template
    return this.serverGames();
  });

  // --- Total de páginas (depende do modo) ---
  totalPages = computed(() => {
    if (this.paginationMode() === 'client') {
      return Math.max(1, Math.ceil(this.filteredGames().length / this.pageSize));
    }
    return Math.max(1, Math.ceil(this.totalServerGames() / this.pageSize));
  });

  /** Números de página para navegação (0 = ellipsis) */
  pages = computed(() => {
    const total   = this.totalPages();
    const current = this.currentPage();
    const result: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) result.push(i);
      return result;
    }

    const left  = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    result.push(1);
    if (left > 2)          result.push(0); // ellipsis esquerdo
    for (let i = left; i <= right; i++) result.push(i);
    if (right < total - 1) result.push(0); // ellipsis direito
    result.push(total);

    return result;
  });

  constructor() {
    // Quando o estado de filtro muda, alternar o modo de paginação
    effect(() => {
      const filtered = this.isFiltered();

      if (filtered && this.paginationMode() !== 'client') {
        this.switchToClientMode();
      } else if (!filtered && this.paginationMode() !== 'server') {
        this.switchToServerMode();
      }
    });
  }

  // --- Troca para paginação client-side (filtro ativo) ---
  private async switchToClientMode() {
    if (this.allGames().length === 0) {
      this.isLoading.set(true);
      const all = await this.gameService.getGames();
      this.allGames.set(all);
      this.isLoading.set(false);
    }
    this.paginationMode.set('client');
    this.currentPage.set(1);
  }

  // --- Troca para paginação server-side (sem filtro) ---
  private async switchToServerMode() {
    this.paginationMode.set('server');
    this.currentPage.set(1);
    this.pageCursors = [null]; // resetar cursores
    await this.loadServerPage(1);
  }

  // --- Filtros ---
  setPlatformFilter(platform: string) {
    this.plataformaFiltro.set(platform);
    this.currentPage.set(1); // resetar página ao filtrar
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1); // resetar página ao buscar
  }

  // --- Carrinho ---
  addToCart(game: Game) {
    if (this.order().includes(game)) {
      this.order.update(order => order.filter(g => g.id !== game.id));
      return;
    }
    this.order.update(order => [...order, game]);
  }

  removeToCart(game: Game) {
    this.order.update(order => order.filter(g => g.id !== game.id));
  }

  cleanCart() {
    this.order.set([]);
  }

  // --- Paginação servidor ---
  private async loadServerPage(page: number) {
    const totalP = this.totalPages();
    if (page < 1 || (totalP > 1 && page > totalP)) return;

    this.isLoading.set(true);

    const cursor = this.pageCursors[page - 1] ?? null;
    const result = await this.gameService.getGamesPaginated(this.pageSize, cursor);

    this.serverGames.set(result.games);
    this.totalServerGames.set(result.total);
    this.currentPage.set(page);

    if (result.lastDoc) {
      this.pageCursors[page] = result.lastDoc;
    }

    this.isLoading.set(false);
  }

  // --- Navegação ---
  goToPage(page: number) {
    if (page === 0) return; // ellipsis

    if (this.paginationMode() === 'server') {
      this.loadServerPage(page);
    } else {
      this.currentPage.set(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  async ngOnInit() {
    await this.loadServerPage(1);
  }
}
