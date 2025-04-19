import { createSlice } from "@reduxjs/toolkit"
import { loginUser, logoutUser } from "./LoginThunk"

const initialState = {
  isLoading: false,
  error: false,
  accessToken: "",
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers:{
    setAuth(state, action) {
      state.accessToken = action.payload.accessToken
    },
    clearAuth(state) {
      state.accessToken = ""
    }
  },
  extraReducers(builder) {
    builder
    .addCase(loginUser.fulfilled, (state, action)=>{
      state.isLoading = false
      state.accessToken = action.payload.accessToken
    })
    .addCase(loginUser.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(loginUser.rejected, (state)=>{
      state.isLoading = false
      state.error = true
    })
    .addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    })
  },
})

export const loginReducer = loginSlice.reducer

export const { setAuth, clearAuth } = loginSlice.actions