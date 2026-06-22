import { computed, Injectable, signal } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

import { firebaseApp } from '../../../firebase.config';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(firebaseApp);

  user = signal<User | null>(null);
  isLogged = computed(() => this.user() !== null);

  constructor() {

  onAuthStateChanged(this.auth, (user) => {

    this.user.set(user);
  });

  }

  async login(email: string, password: string) {

    await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

  }

  async logout() {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }


}
