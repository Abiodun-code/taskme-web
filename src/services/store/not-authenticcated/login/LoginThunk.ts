import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setAuth } from "./LoginSlice";

export const loginUser = createAsyncThunk(
  "auth/signIn",
  async(
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user details from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if(!userSnap.exists()){
        throw new Error("User does not exist in Firestore");
      }

      const userData = userSnap.data();
      
      // Prevent login if user is not verified
      if (!userData.isVerify) {
        throw new Error("User is not verified");
      }

      const accessToken = await user.getIdToken();

      localStorage.setItem("accessToken", accessToken);

      dispatch(setAuth({accessToken}));

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