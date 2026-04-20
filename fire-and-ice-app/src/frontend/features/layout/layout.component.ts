import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { logout } from '../auth/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchService } from '../books/services/search.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-layout',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './layout.html',
})
export class LayoutComponent {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private searchService = inject(SearchService);
  private fb: FormBuilder = inject(FormBuilder);

  searchForm: FormGroup = this.fb.group({
    search: [''],
  });

  onSearch(value: string) {
    this.searchService.setSearch(value);
  }

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
