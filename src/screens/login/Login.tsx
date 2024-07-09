import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import firebase from "../../fireBaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { CustomTextField } from "../../components";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(firebase);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    setForm({ ...form, [fieldName]: value });
  };

  const onClickSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        alert("User logged in successfully");
        navigate("/chat");
      }
    } catch (error) {
      alert("Error logging in with Google");
      console.error("Google Sign-In Error:", error);
    }
  };

  const onClickSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      if (user) {
        alert("User logged in successfully");
        navigate("/chat");
      }
    } catch (error) {
      alert("Error logging in user");
      console.error("Email/Password Sign-In Error:", error);
    }
  };

  return (
    <div className="bg-[#1b1b1b] h-screen flex flex-col justify-center items-center p-8 md:px-10">
      <div className="flex flex-col items-center justify-center text-center flex-grow w-full md:w-4/5 lg:w-2/5">
        <p className="text-white text-4xl md:text-6xl lg:text-8xl">
          Welcome to
        </p>
        <p className="text-white text-4xl md:text-6xl lg:text-8xl font-bold mb-8">
          AI GEMINI
        </p>
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            type="button"
            className="w-full py-3 text-md lg:text-lg 2xl:text-2xl bg-[#393939] transition hover:bg-transparent border border-[#393939] hover:border-white duration-300 ease-in-out text-white flex justify-center items-center gap-4 rounded-md"
            onClick={onClickSignInWithGoogle}
          >
            <GoogleIcon /> Login with Google
          </button>
          <CustomTextField
            placeholder="Email"
            fullWidth
            value={form.email}
            onChange={(e) => handleInputChange(e, "email")}
            InputProps={{ style: { color: "white" } }}
          />
          <CustomTextField
            placeholder="Password"
            fullWidth
            type="password"
            value={form.password}
            onChange={(e) => handleInputChange(e, "password")}
            InputProps={{ style: { color: "white" } }}
          />
          <button
            className="w-full py-3 text-md lg:text-lg 2xl:text-2xl bg-blue-500 text-white flex justify-center items-center gap-4 rounded-md"
            onClick={onClickSignIn}
          >
            Login
          </button>
          <p className="text-white">
            You don't have an account?{" "}
            <a href="/signup" className="py-4 text-white">
              <span className="text-blue-500 inline underline">Sign up</span>
            </a>
          </p>
        </div>
      </div>
      <div className="mt-auto text-center pb-4">
        <p className="text-white text-sm">
          Terms and Conditions | Copyright © 2024 AI GEMINI. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
