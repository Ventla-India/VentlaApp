// reducer.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};
const sliceReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = sliceReducer.actions;
export default sliceReducer.reducer;