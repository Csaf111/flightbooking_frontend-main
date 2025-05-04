import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { routes } from '../app.routes';

@Component({
  selector: 'auth-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authButton.component.html',
  styleUrls: ['./authButton.component.css'],
  providers: [routes]
})
export class AuthButtonComponent {
  isLoggedIn = false;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/signup']);
  }

  logout(): void {
    this.auth.logout();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/']);
  }
}
