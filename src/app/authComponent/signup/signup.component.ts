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

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  signup(): void {
    this.http.post('http://127.0.0.1:5001/register', this.user, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user)); // ✅ store user info
        this.authService.setLoggedIn(true);
        this.router.navigate(['/']);
      },
      error: () => {
        this.signupError = true;
      }
    });
  }
}
