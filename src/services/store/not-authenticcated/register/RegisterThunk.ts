import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../firebase/index";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"

export const registerUser = createAsyncThunk(
  "auth/signUp",
  async (
    { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        firstName,
        lastName,
        email,
        isVerify: false,
      });

      console.log("User added to Firestore:", userRef.id);
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(error);
    }
  }
);
