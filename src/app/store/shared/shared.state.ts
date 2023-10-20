export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export const initialSharedState: SharedState = {
  showLoading: false,
  errorMessage: '',
};
