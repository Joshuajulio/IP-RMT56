import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("access_token");
      navigate("/login");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };
  return (
    <div>
      <nav className="bg-teal-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={() => {
                localStorage.removeItem("searchQuery");
                localStorage.removeItem("page");
              }}>
              <img src="/icon.png" alt="logo" className="h-8 w-8" />
              <span className="text-white font-bold text-xl">SehatKu</span>
            </Link>
            <Link
              to="/"
              className="text-white hover:text-teal-200 transition"
              onClick={() => {
                localStorage.removeItem("searchQuery");
                localStorage.removeItem("page");
              }}>
              Find Drugs
            </Link>
          </div>

          <div className="relative">
            <button
              className="flex items-center text-white hover:text-teal-200 transition"
              onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                  onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
                <Link
                  to="/mydrugs"
                  className="block px-4 py-2 text-gray-700 hover:bg-teal-100"
                  onClick={() => setIsOpen(false)}>
                  Drug Tracking
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100">
                  Logout
                </button>
              </div>
            )}{" "}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
