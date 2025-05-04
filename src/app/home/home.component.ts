import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          jwtDecode(token); // optional: validate token contents
          this.isLoggedIn = true;
        } catch (err) {
          console.warn('Invalid token, logging out.');
          localStorage.removeItem('token');
          this.isLoggedIn = false;
        }
      }
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToSignup(): void {
    this.router.navigate(['/auth/signup']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
