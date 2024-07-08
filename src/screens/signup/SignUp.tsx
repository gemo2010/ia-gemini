import { useState } from "react";
import firebase from "../../fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../components";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const value = e.target.value;
    setForm({ ...form, [fieldName]: value });
  };

  const onClickSignUp = async () => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);
      if (user) {
        alert("User registered successfully");
        navigate("/");
      }
    } catch (error) {
      alert("Error to register user");
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
          <CustomTextField
            placeholder="Name"
            fullWidth
            value={form.name}
            onChange={(e) => handleInputChange(e, "name")}
            InputProps={{ style: { color: "white" } }}
          />
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
            value={form.password} // Este es el cambio necesario
            onChange={(e) => handleInputChange(e, "password")}
            InputProps={{ style: { color: "white" } }}
          />
          <button
            className="w-full py-3 text-md lg:text-lg 2xl:text-2xl bg-blue-500 text-white flex justify-center items-center gap-4 rounded-md"
            onClick={onClickSignUp}
          >
            Sign up
          </button>
          <p className="text-white">
            Go back to{" "}
            <a href="/" className="py-4 text-white">
              <p className="text-blue-500 inline underline">Login</p>
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
