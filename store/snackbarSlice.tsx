import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
    visible: boolean;
    message: string;
}

const initialState: SnackbarState = {
    visible: false,
    message: '',
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<string>) => {
            state.visible = true;
            state.message = action.payload;
        },
        hideSnackbar: (state) => {
            state.visible = false;
            state.message = '';
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
