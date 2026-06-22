import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { CardsGrid } from './cards-grid/cards-grid';






@Component({
  selector: 'app-home',
  imports: [Hero, CardsGrid],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
