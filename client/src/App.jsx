import { BrowserRouter, Routes, Route } from "react-router";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
