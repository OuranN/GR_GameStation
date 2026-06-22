import { Component, signal } from '@angular/core';
import { WhatsappConfig } from "./whatsapp-config/whatsapp-config";
import { AddGame } from "./add-game/add-game";
import { GameList } from "./game-list/game-list";
import { UpdateGame } from "./update-game/update-game";
import { Game } from '../../models/game';

@Component({
  selector: 'app-admin',
  imports: [WhatsappConfig, AddGame, GameList, UpdateGame],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  gameModel = {
      nome: '',
      plataforma:'PS4' ,
      preco:0 ,
      estoque:0 ,
      status:'' ,
      imagem:'' ,
  }
  isEditGame = signal<boolean>(false);

  gameEdit = signal<Game>(this.gameModel);

  onEditGame(game:Game){
    this.setIsEditGame();
    this.gameEdit.set(game);
  }

  setIsEditGame(){
    this.isEditGame.set(true);
  }

  unsetIsEditGame(){
    this.isEditGame.set(false);
     this.gameEdit.set(this.gameModel);
  }
}
