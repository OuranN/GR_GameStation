import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../../services/AuthService/auth-service';

@Component({
  selector: 'app-admin-auth',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './admin-auth.html',
  styleUrl: './admin-auth.css',
})
export class AdminAuth {
  private authService = inject(AuthService)
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)]
    })
  })

  async onLogin() {
    if (this.form.invalid) {
      console.log("invalido")
      return
    };

    try {

      await this.authService.login(
        this.form.controls.email.value!,
        this.form.controls.password.value!
      );

      console.log('Login realizado');
      this.router.navigate(['/admin']);

    } catch {

      console.log('Email ou senha inválidos');
    }

  }
}
