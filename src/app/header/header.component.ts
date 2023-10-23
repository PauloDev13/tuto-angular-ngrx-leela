import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated, selectUser } from '../auth/state/auth.selector';
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
  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userEmail$ = this.store.select(selectUser);
  }
}
