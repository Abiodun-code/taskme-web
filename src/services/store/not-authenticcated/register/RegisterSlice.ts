import { createSlice } from "@reduxjs/toolkit"
import { registerUser } from "./RegisterThunk"

const initialState = {
  isLoading: false,
  error: false,
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = false
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })
  },
})

export const registerReducer = registerSlice.reducer
