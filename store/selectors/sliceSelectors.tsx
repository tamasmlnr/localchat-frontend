import { RootState } from "../index";

export const selectSnackbarVisible = (state: RootState) => state.snackbar.visible;
export const selectSnackbarMessage = (state: RootState) => state.snackbar.message;
export const selectState = (state: RootState) => state;
