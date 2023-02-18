import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../hooks";

interface IState {
  loader: boolean;
}

const initialState: IState = { loader: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { setLoader } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
