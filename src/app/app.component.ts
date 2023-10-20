import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './store/app.state';
import { selectLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tuto-angular-ngrx-leela';
  showLoading$!: Observable<boolean>;
  readonly store: Store<AppState> = inject(Store);

  ngOnInit() {
    this.showLoading$ = this.store.select(selectLoading);
  }
}
