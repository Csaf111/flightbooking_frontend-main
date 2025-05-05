import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  user = { username: '', email: '', password: '' };
  signupSuccess = false;
  signupError = false;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  signup(): void {
    this.signupSuccess = false;
    this.signupError = false;
    this.errorMessage = '';

    this.http.post('http://127.0.0.1:5001/register', this.user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authService.setLoggedIn(true);
        this.signupSuccess = true;
        setTimeout(() => this.router.navigate(['/dashboard']), 1500); // ✅ redirect after 1.5s
      },
      error: (err) => {
        this.signupError = true;
        this.errorMessage = err?.error?.message || 'Signup failed. Please try again.';
      }
    });
  }
}
