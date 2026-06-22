import { Injectable } from '@angular/core';
import { Game } from '../../models/game';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { firebaseApp } from '../../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  private db = getFirestore(firebaseApp);
  
  async sendWhatsApp(order: Game[], total:number) {
    
    const items = order
      .map(game =>
        `• [ ${game.plataforma} ] ${game.nome} - R$ ${game.preco.toFixed(2)}`
      )
      .join('\n');

    const message = `Olá! Gostaria de comprar os seguintes itens:

${items}

  Total: R$ ${total.toFixed(2)}
  `;

    
    const number = await this.getWhatsappNumber()
    const url =
      `https://wa.me/55${number}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }


  async redirectToWhatsapp(){
    const number = `55${await this.getWhatsappNumber()}`;
    const url =`https://wa.me/${number}`;
    window.open(url, '_blank');
  }

  async saveWhatsappNumber(number: string) {

    const whatsappRef = doc(this.db, 'whatsapp', 'config');

    await setDoc(whatsappRef, {
      whatsappNumber: number
    });

  }

  async getWhatsappNumber(): Promise<string> {

    const whatsappRef = doc(this.db, 'whatsapp', 'config');

    const snapshot = await getDoc(whatsappRef);

    if (snapshot.exists()) {
      return snapshot.data()['whatsappNumber'];
    }

    return '';
  }
}
