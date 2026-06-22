import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../../services/game/game.service';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-update-game',
  imports: [ReactiveFormsModule],
  templateUrl: './update-game.html',
  styleUrl: './update-game.css',
})
export class UpdateGame {
  private gameService = inject(GameService)
  game = input.required<Game>()
  onFinishEditGame = output()

  constructor() {

      effect(() => {

        const game = this.game();

        this.form.patchValue({
          titulo: game.nome,
          imgUrl: game.imagem,
          preco: game.preco,
          estoque: game.estoque,
          plataforma: game.plataforma,
          condicao: game.status
        });

      });

    }

  form = new FormGroup({
    titulo: new FormControl('',),
    imgUrl: new FormControl(''),
    preco: new FormControl(0,),
    estoque: new FormControl(0,),
    plataforma: new FormControl('',),
    condicao: new FormControl('',),
  })

  async onUpdateGame(){
    const game:Game = {
          id: this.game().id,
          nome: this.form.controls.titulo.value!,
          plataforma: this.form.controls.plataforma.value!,
          preco: this.form.controls.preco.value!,
          estoque: this.form.controls.estoque.value!,
          status: this.form.controls.condicao.value!,
          imagem: this.form.controls.imgUrl.value!,
    }
    await this.gameService.updateGame(game)
    this.onFinishEditGame.emit();
  }

  onCancelUpdate(){
    this.onFinishEditGame.emit();
  }
}
