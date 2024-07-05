import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { CustomTextField } from "../../components";

function Login() {
  return (
    <div className="bg-[#1b1b1b] h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <p className="text-white text-2xl md:text-3xl lg:text-8xl">
          Welcome to
        </p>
        <p className="text-white text-2xl md:text-3xl lg:text-8xl font-bold mb-8">
          AI CODE
        </p>
        <button className="px-10 w-full py-3 mb-4 text-lg md:text-xl lg:text-2xl bg-[#393939] text-white flex justify-center items-center gap-4 rounded-md">
          <GoogleIcon /> Login with Google
        </button>
        <button className="px-10 w-full py-3 mb-4 text-lg md:text-xl lg:text-2xl bg-[#393939] text-white flex justify-center items-center gap-4 rounded-md">
          <MicrosoftIcon /> Login with Microsoft
        </button>
        <CustomTextField placeholder="Login with email" fullWidth />
        <a href="/chat" className="py-4 text-white">Go to chat</a>
      </div>
      <div className="mt-auto text-center pb-4">
        <p className="text-white text-sm">
          Terms and Conditions | Copyright © 2024 AI CODE. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
