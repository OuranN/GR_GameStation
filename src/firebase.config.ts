import { initializeApp } from 'firebase/app';
import { enviroment } from './environments/environment';


export const firebaseConfig = enviroment.firebase;

export const firebaseApp = initializeApp(firebaseConfig);