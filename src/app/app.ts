import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { HEADER } from './shared/header/header';
import { AuthService } from './services/AuthService/auth-service';
import { HeaderAdmin } from "./shared/header/header-admin/header-admin";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, HEADER, HeaderAdmin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Gr_GameStation');

  auth = inject(AuthService);
}
