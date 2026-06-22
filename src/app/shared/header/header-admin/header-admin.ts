import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/AuthService/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  imports: [RouterLink],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css',
})
export class HeaderAdmin {
  auth = inject(AuthService);
  router = inject(Router);

  onLogout(){
    this.auth.logout();
    this.router.navigate(['/adminAuth']);
  }
}
