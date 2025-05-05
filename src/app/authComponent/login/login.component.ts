import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user = { username: '', password: '' };
  loginError = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.authService.login(this.user).subscribe({
      next: () => {
        this.loginError = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = true;
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
