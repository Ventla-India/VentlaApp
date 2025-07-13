import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  logindata: {},
  userData: {
    bio: '',
    identity: [],
    education: [],
    selfie: null,
    work: '',
  },
};

const cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    setLoginData(state, action) {
      state.logindata = action.payload;
    },
    setUserData(state, action) {
      state.userData = {...state.userData, ...action.payload};
    },
  },
});

export const {setLoginData,setUserData} = cookies.actions;
export default cookies.reducer;