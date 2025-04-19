import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, reload } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

      // Reload user to get the most up-to-date emailVerified status
      await reload(user);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error("User does not exist in Firestore");
      }

      const userData = userSnap.data();

      // If email is verified but isVerify in Firestore is still false, update it
      if (user.emailVerified && !userData.isVerify) {
        await updateDoc(userRef, {
          isVerify: true,
        });
        userData.isVerify = true; // Update the local copy
      }

      // Prevent login if still not verified
      if (!userData.isVerify) {
        throw new Error("Please verify your email before logging in.");
      }

      const accessToken = await user.getIdToken();
      localStorage.setItem("accessToken", accessToken);

      dispatch(setAuth({ accessToken }));

      return {
        accessToken,
        user: {
          uid: user.uid,
          email: user.email,
          ...userData,
        },
      };

    } catch (error) {
      return rejectWithValue(error);
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