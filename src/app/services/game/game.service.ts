import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';

import { firebaseApp } from '../../../firebase.config';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private db = getFirestore(firebaseApp);

  constructor() {}

  async addGame(game:Game) {

    const gamesCollection = collection(this.db, 'games');

    await addDoc(gamesCollection, {
      nome: game.nome,
      plataforma: game.plataforma,
      preco: game.preco,
      estoque: game.estoque,
      status: game.status,
      imagem: game.imagem
    });

  }

  async updateGame(game: Game) {

    if (!game.id) {
      throw new Error('O jogo precisa ter um id');
    }
    const gameRef = doc(this.db, 'games', game.id);


    await updateDoc(gameRef, {
      nome: game.nome,
      plataforma: game.plataforma,
      preco: game.preco,
      estoque: game.estoque,
      status: game.status,
      imagem: game.imagem
    });
  }

  // DELETE
  async deleteGame(gameId: string) {

    const gameRef = doc(this.db, 'games', gameId);

    await deleteDoc(gameRef);
  }


  async getGames(): Promise<Game[]> {

    const gamesCollection = collection(this.db, 'games');

    const snapshot = await getDocs(gamesCollection);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Game[];
  }

  listenGames(callback: (games: Game[]) => void) {

  const gamesCollection = collection(this.db, 'games');

  return onSnapshot(gamesCollection, (snapshot) => {

    const games = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Game[];

    callback(games);

  });

}



}