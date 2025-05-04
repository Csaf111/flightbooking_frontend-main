import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  user: any = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/auth/login']);
  }
}
