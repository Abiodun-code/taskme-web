import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  error: null,

}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers:{}
})

export const loginReducer = loginSlice.reducer