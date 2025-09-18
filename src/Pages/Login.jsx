import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { getBaseURL } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setmessage] = useState("")
  const [error, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async () => {
    try {
      setmessage("");
      setErrors({});
      if (!password || !email) {
        setmessage("Fields should not be empty");
        return;
      }

      const res = await fetch(`${getBaseURL()}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });


      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        if (data.error?.includes("User")) {
          setErrors((prev) => ({ ...prev, email: data.error }));
        }

        if (data.error?.includes("password")) {
          setErrors((prev) => ({ ...prev, password: data.error }));
        }
      }

      if (res.ok) {
        setmessage(data.message);
        navigate("/homepage")
      }
    } catch (err) {
      console.log("error is", err);
    }
  };

  return (<div>
    <div id="auth-container" className="auth-page flex items-center justify-center p-4 md:bg-gradient-to-br from-blue-600 to-purple-700 h-screen">

      <div id="login-page" className="auth-card w-full max-w-md rounded-xl shadow-2xl p-8 bg-white">
        <div className="text-center mb-8">
          <img src="logo.png"
            alt="TaskFlow logo with modern blue gradient design and checkmark symbol"
            className="h-16 w-16 mx-auto mb-4 rounded-lg" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to manage your tasks and team</p>
        </div>

        <div id="login-form" className="space-y-6">
          <div>
            {/* Email */}
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="email" required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg  focus:border-transparent transition duration-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: "" }))
              }}
            />
            {error.email && (
              <p className="text-red-500 text-sm m-1">{error.email}</p>
            )}

          </div>
          {/* Password */}
          <div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className='border flex items-center border-gray-300 rounded-lg px-4 py-3'>
                <input type={showPassword ? "text" : "password"} required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="input-field w-full outline-none transition duration-200"
                  placeholder="Enter your password"
                />
                <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
              </div>
              {error.password && <p className='text-sm text-red-500 m-1'>{error.password}</p>}
            </div>
            <div className="flex justify-end mt-2">
              <button type="button"
                className="text-sm text-blue-600 hover:text-blue-800 transition duration-200">
                Forgot Password?
              </button>
            </div>
          </div>


          <button onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 transform hover:scale-101 cursor-pointer">
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 cursor-pointer ml-2" >
              Sign up now
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition duration-200">
              <FcGoogle />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button type='button'
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50 transition duration-200">
              <img className='h-4' src="Microsoft_logo.svg" alt="" />
              <span className="text-sm font-medium">Microsoft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
