import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "../../../../types";

interface UserState {
  isLoading: boolean;
  error: string | null;
  uploadingImage: boolean;
}

const initialState: UserState = {
  isLoading: false,
  error: null,
  uploadingImage: false,
};

export const uploadUserProfileImage = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  "user/updateProfile",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return rejectWithValue("No user logged in");
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, updatedUser);

      const updatedSnap = await getDoc(userRef);
      return { uid: currentUser.uid, ...updatedSnap.data() } as User;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to update user profile");
    }
  }
);

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserProfileImage.pending, (state) => {
        state.uploadingImage = true;
        state.error = null;
      })
      .addCase(uploadUserProfileImage.fulfilled, (state) => {
        state.uploadingImage = false;
      })
      .addCase(uploadUserProfileImage.rejected, (state, action) => {
        state.uploadingImage = false;
        state.error = action.payload as string;
      });
  },
})

export const updateImageReducer = imageSlice.reducer;
