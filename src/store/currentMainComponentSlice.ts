import { createSlice, PayloadAction } from '@reduxjs/toolkit';




interface CurrentMainComponentState {
  value: string;
  props?: any; 
}

interface SetCurrentMainComponentPayload {
  value: string;
  props?: any;
}

const initialState: CurrentMainComponentState = {
  value: '',
  props: {},
};

const currentMainComponentSlice = createSlice({
  name: 'currentMainComponent',
  initialState,
  reducers: {
    setCurrentMainComponent: (state, action: PayloadAction<SetCurrentMainComponentPayload>) => {
      state.value = action.payload.value;
      state.props = action.payload.props ? action.payload.props : {};
    },
  },
});

export const { setCurrentMainComponent } = currentMainComponentSlice.actions;

export default currentMainComponentSlice.reducer;