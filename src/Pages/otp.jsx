import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBaseURL } from "../../utils/api";

export default function Otp({ onVerified }) {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const inputsRef = useRef([]);


  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async () => {
    setMessage("")
    setError("")
    if (!email) return alert("Email not found. Go back and try again.");

    const enteredOtp = otp.join("");
    try {
      const res = await fetch(`${getBaseURL()}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await res.json();
      if (res.ok) {
        if (onVerified) onVerified();
        navigate("/username");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isBlocked) return;

    try {
      const res = await fetch(`${getBaseURL()}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP resent successfully!");
        setResendCooldown(10);
        setResendCount(data.resendCount);
      } else {
        alert(data.error);
        if (data.error.includes("1 hour")) setIsBlocked(true);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="shadow-2xl px-10 py-8 flex flex-col items-center justify-center gap-5 rounded-lg max-w-[350px] md:max-w-[400px]">
        <h1 className="text-xl md:text-2xl font-bold mb-0">Verify Your Email</h1>
        <p className="text-center text-sm md:text-md -mt-3">Enter the 4-digit code sent to your email address</p>

        <div className="w-fit gap-4 flex">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => (inputsRef.current[i] = el)}
              value={digit}
              onChange={e => {
                const val = e.target.value.slice(0, 1);
                const newOtp = [...otp];
                newOtp[i] = val;
                setOtp(newOtp);
                if (val && i < 3) inputsRef.current[i + 1].focus();
              }}
              onKeyDown={e => {
                if (e.key === "Backspace" && !otp[i] && i > 0) {
                  inputsRef.current[i - 1].focus();
                }
              }}
              type="text"
              className="text-center border w-[35px] h-[35px] rounded-lg"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="cursor-pointer px-20 rounded-lg py-2 bg-blue-500 text-white"
        >
          Submit
        </button>
        {message && <p className="text-green-500 text-sm -m-3">{message}</p>}
        {error && <p className="text-red-500 text-sm -m-3">{error}</p>}
        <p className="m-0 text-sm md:text-md">Didn't recieve the code?</p>
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0 || isBlocked}
          className={`px-3 py-1 rounded-lg text-blue-600 cursor-pointer -mt-4 text-sm md:text-lg ${resendCooldown > 0 || isBlocked ? " cursor-not-allowed" : ""
            }`}
        >
          {isBlocked
            ? "OTP blocked for 1 hour"
            : resendCooldown > 0
              ? `Resend OTP in ${resendCooldown}s`
              : "Resend OTP"}
        </button>

      </div>
    </div>
  );
}
