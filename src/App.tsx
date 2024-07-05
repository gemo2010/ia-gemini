import { Route, Routes } from "react-router-dom";
import Login from "./screens/login/Login";
import Chat from "./screens/chat/Chat";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
