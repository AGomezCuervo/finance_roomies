import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosError } from "axios";
import { URL } from "../utils/back-routes";
import { AuthStateType } from "../utils/types";

const initialState: AuthStateType = {
  isAuth: false,
  error: null,
}

const fetchLogin = createAsyncThunk("auth/fetchLogin", async (credentials:{email: string, password: string}) => {
  try {
    const data = (await axios.post(URL + "login", credentials)).data;
    return data;

  } catch(error) {
    if(error instanceof AxiosError) {
      throw error;
    }
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchLogin.fulfilled, (state,action) => {
        state.error = null
        state.isAuth = action.payload.auth;
        state.currentUser = action.payload.user;
    })
    .addCase(fetchLogin.rejected, (state,action) => {
        state.error = action.error.message;
      })
  }
})

export {fetchLogin};
export default authSlice.reducer;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectError = (state: RootState) => state.auth.error;
export const {cleanError} = authSlice.actions;
