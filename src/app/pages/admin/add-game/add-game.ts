import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../../services/game/game.service';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-add-game',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-game.html',
  styleUrl: './add-game.css',
})
export class AddGame {
  private gameService = inject(GameService)
  form = new FormGroup({
    titulo: new FormControl('',),
    imgUrl: new FormControl('',),
    preco: new FormControl(0,),
    estoque: new FormControl(0,),
    plataforma: new FormControl('',),
    condicao: new FormControl('',),
  })

  onAddGame(){

     if (this.form.invalid) return;

    const game:Game = {
        nome: this.form.controls.titulo.value!,
        plataforma: this.form.controls.plataforma.value!,
        preco: this.form.controls.preco.value!,
        estoque: this.form.controls.estoque.value!,
        status:  this.form.controls.condicao.value!,
        imagem: this.form.controls.imgUrl.value!,
    }

    this.gameService.addGame(game)
    this.form.reset()
  }
}
