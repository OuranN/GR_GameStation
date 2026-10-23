import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';

import { firebaseApp } from '../../../firebase.config';
import { Game } from '../../models/game';

export interface PaginatedGames {
  games: Game[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  total: number;
}

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

  async getGamesPaginated(
    pageSize: number,
    lastVisible: QueryDocumentSnapshot<DocumentData> | null
  ): Promise<PaginatedGames> {

    const gamesCollection = collection(this.db, 'games');

    // Obter total de documentos
    const countSnap = await getCountFromServer(gamesCollection);
    const total = countSnap.data().count;

    // Montar query com ou sem cursor
    const q = lastVisible
      ? query(gamesCollection, orderBy('nome'), startAfter(lastVisible), limit(pageSize))
      : query(gamesCollection, orderBy('nome'), limit(pageSize));

    const snapshot = await getDocs(q);

    const games = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as Game[];

    const lastDoc = snapshot.docs.length > 0
      ? snapshot.docs[snapshot.docs.length - 1]
      : null;

    return { games, lastDoc, total };
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