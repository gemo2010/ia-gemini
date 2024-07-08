import { Route, Routes } from "react-router-dom";
import Login from "./screens/login/Login";
import Chat from "./screens/chat/Chat";
import SignUp from "./screens/signup/SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
