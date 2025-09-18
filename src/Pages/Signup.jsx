import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { getBaseURL } from '../../utils/api';
import { FcGoogle } from "react-icons/fc";



export default function Signup() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState(false)
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" })

    let strength = 0

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    const colors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];



    const handleSubmit = async (e) => {
        e.preventDefault();


        setMessage("")
        setErrors({})

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setMessage("Fields should not be empty")
            return;
        } else if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }))
            console.log(errors.confirmPassword);
            return;
        } else if (password.length < 6) {
            setErrors((prev) => ({ ...prev, password: "Password should be atleast 6 characters long" }))
            console.log(errors)
            return;
        }
        try {
            const res = await fetch(`${getBaseURL()}/signUp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                if (data.error && data.error.includes("Email")) {
                    setErrors((prev) => ({ ...prev, email: data.error }))
                    console.log(data.error)
                }
            }

            if (res.ok) {
                navigate("/otp", { state: { email } })
            }
        }
        catch (err) {
            console.log("Error: ", err)
        }

    }


    return (
        <div className='flex items-center justify-center p-4 md:bg-gradient-to-br from-blue-200 to-purple-700'>
            <div className="auth-card w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white">
                <div className="md:flex">
                    <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-500 to-purple-700 p-8 text-white">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <img src="logo.png"
                                    alt="PlanIt logo with modern checkmark and calendar icon design in white"
                                    className="h-12 w-12 mb-8 rounded-lg" />
                                <h2 className="text-2xl font-bold mb-4">Plan Your Success</h2>
                                <p className="text-blue-100">Join thousands of teams that use PlanIt to organize their projects and
                                    achieve their goals.</p>
                            </div>
                            <div className="mt-8">
                                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f8b74e5f-8d56-4ba5-bf5e-eb5682330500.png"
                                    alt="Team collaboration illustration showing diverse people working together on planning tasks"
                                    className="w-full rounded-lg" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 p-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <img src="logo.png"
                                    alt="PlanIt logo with modern blue and purple gradient design"
                                    className="h-12 w-12 mr-3 rounded-lg" />
                                <h1 className="text-3xl font-bold text-gray-800">PlanIt</h1>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create Your Account</h2>
                            <p className="text-gray-600">Join thousands of teams managing tasks with PlanIt</p>
                        </div>

                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className="social-btn flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50">
                                    <FcGoogle />
                                    <span className="text-sm font-medium text-gray-700">Google</span>
                                </button>
                                <button
                                    className="social-btn flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50">
                                    <img className='h-4' src="Microsoft_logo.svg" alt="" />
                                    <span className="text-sm font-medium text-gray-700">Microsoft</span>
                                </button>
                            </div>

                            <div className="relative flex items-center my-6">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with email</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                        </div>

                        {message && <p className='text-xs text-red-500 my-3'>{message}</p>}
                        <div id="signup-form" className="space-y-5">

                            {/* First Name */}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="First name" />
                                </div>

                                {/* Last Name */}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="Last name" />
                                </div>
                            </div>

                            {/* Email */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    className={`input-field w-full px-4 py-3 border rounded-lg  focus:border-transparent transition duration-200 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="your@email.com"
                                />
                                {errors.email && <p className='text-red-500 text-sm m-1'>{errors.email}</p>}
                            </div>

                            {/* Password */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className='border flex items-center border-gray-300 rounded-lg px-4 py-3'>
                                    <input type={showPassword ? "text" : "password"} required
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="input-field w-full outline-none transition duration-200"
                                        placeholder="Create a secure password"
                                    />
                                    <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                                </div>
                                <div className="mt-2">
                                    <div className="flex items-center mb-1">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div key={i}
                                                className={`w-full m-2 h-1 rounded-full transition-all duration-200 ${i < strength ? colors[strength - 1] : "bg-gray-400"
                                                    }`}></div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">Use 6+ characters with a mix of letters, numbers & symbols
                                    </p>
                                </div>
                                {errors.password && <p className='text-red-500 text-sm m-1'>{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>

                                <input type="text" required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    className={`input-field w-full px-4 py-3 border  rounded-lg  transition duration-200 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && <p className='text-sm text-red-500 m-2'>{errors.confirmPassword}</p>}
                            </div>


                            <button onClick={handleSubmit} className="text-white cursor-pointer bg-blue-500 btn-primary w-full py-3 px-4 rounded-lg font-medium">
                                Create Account
                            </button>

                        </div>
                        <div className=" text-center mt-6">
                            <p className="text-gray-600">Already have an account?
                                <Link to={'/login'} className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 ml-2">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
