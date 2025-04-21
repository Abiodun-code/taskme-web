import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../../../../types";

interface UserState {
  user: User | null; // Stores the global user data
  isLoading: boolean; // Indicates if the user data is being loaded
  error: string | null; // Stores any error message
}

const initialState:UserState = {
  user: null, // Stores the global user data
  isLoading: false,
  error: null,
};

// Create async thunk for fetching current user from backend API using Axios
export const fetchCurrentUser = createAsyncThunk<User, void, {rejectValue: string}>(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          throw new Error("User data not found in Firestore");
        }
        return { uid: currentUser.uid, ...userSnap.data() };
      }

      // If currentUser is null, wait for onAuthStateChanged
      const userPromise = new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe();
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              reject(new Error("User data not found in Firestore"));
            } else {
              resolve({ uid: user.uid, ...userSnap.data() });
            }
          } else {
            reject(new Error("No user logged in"));
          }
        });
      });

      const userData = await userPromise;
      return userData;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch user data");
    }
  }
);

// Create async thunk for updating user in AsyncStorage
export const updateUserInAsyncStorage = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  "user/updateInAsyncStorage",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return rejectWithValue("No user logged in");
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, updatedUser);

      return { uid: currentUser.uid, ...updatedUser } as User;
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to update user");
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
      state.error = action.payload || "Failed to fetch user data";
    });

    builder.addCase(updateUserInAsyncStorage.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const updateUserReducer = userSlice.reducer;