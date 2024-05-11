import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentMainComponentState {
  value: string;
}

const initialState: CurrentMainComponentState = {
  value: '',
};

const currentMainComponentSlice = createSlice({
  name: 'currentMainComponent',
  initialState,
  reducers: {
    setCurrentMainComponent: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentMainComponent } = currentMainComponentSlice.actions;

export default currentMainComponentSlice.reducer;