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
  user = { username: '', password: '' }; // ✅ Match backend credentials
  loginError = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authService.setLoggedIn(true);
        this.router.navigate(['/dashboard']); // ✅ redirect after login
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loginError = true;
      }
    });
  }
}
