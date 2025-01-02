import { useState } from "react";
import { api } from "../helpers/http-client";
import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/ip/register", user);
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
      });
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/createprofile");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: `${error.response.data.message}`,
        text: "Please try again",
      });
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block md:w-1/2 lg:w-3/5 h-screen">
        <img
          src="/landing.png"
          alt="landing"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 lg:w-2/5 bg-[#b0e9ff] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 min-h-screen">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img
              src="/icon.png"
              alt="SehatKu Icon"
              className="w-8 sm:w-12 h-8 sm:h-12"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-600 text-center">
              SehatKu
            </h1>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <form className="space-y-4 sm:space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-teal-600 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aa0bb] transition duration-200"
                  placeholder="Enter your email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-teal-600 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5aa0bb] transition duration-200"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <div className="pt-2">
                <button className="w-full bg-[#5aa0bb] text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#6bbfdf] hover:text-white active:bg-teal-400 transition duration-300 shadow-lg hover:shadow-xl">
                  Register
                </button>
              </div>
            </form>

            <p className="text-black text-center text-xs sm:text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline text-rose-600">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
