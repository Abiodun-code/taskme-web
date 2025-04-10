import { configureStore } from '@reduxjs/toolkit'
import { registerReducer } from './not-authenticcated/register/RegisterSlice'
import { loginReducer } from './not-authenticcated/login/LoginSlice'
// ...

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example: user: userReducer,
    register: registerReducer,
    login: loginReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch