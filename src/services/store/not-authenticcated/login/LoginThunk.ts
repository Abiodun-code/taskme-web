import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { clearAuth, setAuth } from "./LoginSlice";

export const loginUser = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Make sure we have a user
      if (!user || !user.uid) throw new Error("Authentication failed");

      // Access user's Firestore document
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User profile not found in Firestore");
      }

      const userData = userSnap.data();

      // Get token
      const accessToken = await user.getIdToken();
      localStorage.setItem("accessToken", accessToken);

      // Save to Redux
      dispatch(setAuth({ accessToken }));

      return {
        accessToken,
        user: {
          uid: user.uid,
          email: user.email,
          ...userData,
        },
      };
    } catch (error: any) {
      console.error("Login error:", error.message || error);
      return rejectWithValue({
        code: error.code || "auth/unknown-error",
        message: error.message || "An unknown error occurred.",
      });
    }
  }
);



export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  try {
    await auth.signOut();
    localStorage.removeItem("accessToken");
    dispatch(clearAuth());
  } catch (error) {
    console.error("Error logging out:", error);
  }
});