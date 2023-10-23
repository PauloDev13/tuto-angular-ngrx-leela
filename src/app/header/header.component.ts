import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { autoLogout } from '../auth/state/auth.action';
import { selectIsAuthenticated, selectUser } from '../auth/state/auth.selector';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail$!: Observable<string | undefined>;
  isAuthenticated$!: Observable<boolean>;

  readonly store: Store<AppState> = inject(Store);
  readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userEmail$ = this.store.select(selectUser);
  }

  onLogout(event: Event) {
    console.log('LOGOUT');
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
