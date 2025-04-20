import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const initialState = {
  user: null, // Stores the global user data
  isLoading: false,
  error: null,
};

// Create async thunk for fetching current user from backend API using Axios
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user logged in");
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User data not found in Firestore");
      }

      return { uid: currentUser.uid, ...userSnap.data() };
    } catch (error:unknown | undefined) {
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

// Create async thunk for updating user in AsyncStorage
export const updateUserInAsyncStorage = createAsyncThunk(
  "user/updateInAsyncStorage",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("No user logged in");
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, updatedUser);

      return { uid: currentUser.uid, ...updatedUser };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update user");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserInAsyncStorage.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const updateUserReducer = userSlice.reducer;