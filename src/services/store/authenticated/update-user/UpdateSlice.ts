import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
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
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
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
        return { uid: currentUser.uid, ...userSnap.data() } as User;
      }

      // If currentUser is null, wait for onAuthStateChanged
      // eslint-disable-next-line no-async-promise-executor
      const userPromise = new Promise<User>(async (resolve, reject) => { // 👈 add <User> here
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe();
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              reject(new Error("User data not found in Firestore"));
            } else {
              resolve({ uid: user.uid, ...userSnap.data() } as User);
            }
          } else {
            reject(new Error("No user logged in"));
          }
        });
      });

      const userData = await userPromise;
      return userData;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to fetch user data");
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
  },
});

export const updateUserReducer = userSlice.reducer;