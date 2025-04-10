import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/index";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const registerUser = createAsyncThunk("auth/signUp", async ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Update user profile with displayName
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`,
    }).catch((error) => {
      console.error("Error updating profile:", error);
    })

    return userCredential.user
  } catch (error) {
    return rejectWithValue(error);
  }
})