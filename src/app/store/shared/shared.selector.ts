import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

export const selectSharedState =
  createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const selectLoading = createSelector(
  selectSharedState,
  (state: SharedState) => {
    return state.showLoading;
  },
);

export const selectErrorMessage = createSelector(
  selectSharedState,
  (state: SharedState) => {
    return state.errorMessage;
  },
);
