import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = createAsyncThunk(
  "auth/signUp",
  async (
    {
      firstName,
      lastName,
      email,
      password,
    }: { firstName: string; lastName: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Send email verification
      await sendEmailVerification(user);

      // Save to Firestore with isVerify = false
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        firstName,
        lastName,
        email,
        isVerify: false,
      });

      return {
        uid: user.uid,
        email: user.email,
        message: "Verification email sent. Please verify your email before logging in.",
      };
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(error);
    }
  }
);
