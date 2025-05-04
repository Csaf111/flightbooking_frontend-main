import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'nav-component',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe],
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$;
  }

  get user() {
    return this.authService.user; // 👤 access stored user info
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
