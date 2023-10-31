import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from './custom-serializer';

export const ROUTER_STATE = 'router';
export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_STATE);

export const selectCurrentRoute = createSelector(
  selectRouterState,
  (router: RouterReducerState<RouterStateUrl>) => {
    return router.state;
  },
);
