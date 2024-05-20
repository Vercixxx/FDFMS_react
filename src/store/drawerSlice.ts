import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: false,
        title: '',
        component: null,
    },
    reducers: {
        openDrawer: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.component = action.payload.component;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
            state.title = '';
            state.component = null;
        },
    },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;