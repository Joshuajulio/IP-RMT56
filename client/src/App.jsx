import { BrowserRouter, Routes, Route } from "react-router";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import DrugDetail from "./pages/DrugDetail.jsx";
import DrugTracking from "./pages/DrugTracking.jsx";

import UnAuthLayout from "./layouts/UnAuthLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import NavbarLayout from "./layouts/NavbarLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnAuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route element={<NavbarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/drugs/:id" element={<DrugDetail />} />
            <Route path="/mydrugs" element={<DrugTracking />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
