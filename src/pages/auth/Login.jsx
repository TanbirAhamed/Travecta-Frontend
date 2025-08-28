import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        console.log({ email, password });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fdf8] px-4">
            {/* Logo + Heading */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 text-xl font-bold">
                    <span className="text-blue-600 text-2xl">📍</span> Travecta
                </div>
                <h2 className="mt-4 text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-500">
                    Sign in to your account to continue planning trips
                </p>
            </div>

            {/* Card */}
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm">
                <h3 className="font-semibold text-lg mb-4">Sign In</h3>

                <form onSubmit={handleLogin}>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name='password'
                            placeholder="Enter your password"
                            autoComplete='off'
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Sign In Button */}
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
                        Sign In <FaArrowRight />
                    </button>
                </form>

                {/* Sign up link */}
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
