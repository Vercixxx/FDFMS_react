import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: false,
        title: '',
        component: null,
        width: 400,
        loading: false,
    },
    reducers: {
        openDrawer: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.component = action.payload.component;
            state.width = action.payload.width || 400;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
            state.title = '';
            state.component = null;
            state.width = 400;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        }
    },
});

export const { openDrawer, closeDrawer, startLoading, stopLoading } = drawerSlice.actions;

export default drawerSlice.reducer;