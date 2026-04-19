import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { logout } from '../auth/store';

@Component({
  selector: 'app-layout',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './layout.html',
})
export class LayoutComponent {
  private store: Store = inject(Store);
  private router: Router = inject(Router);

  goToBooks() {
    this.router.navigate(['/books']);
  }

  goToCharacters() {
    this.router.navigate(['/characters']);
  }

  onLogout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
