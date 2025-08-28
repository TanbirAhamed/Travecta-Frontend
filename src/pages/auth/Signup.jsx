import React from "react";
import { FaUserPlus } from "react-icons/fa";

const Signup = () => {

    const handleSignup = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const photoURL = form.get("photoURL");
        const email = form.get("email");
        const password = form.get("password");

        console.log({ name, photoURL, email, password });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fdf8] px-4">
            {/* Logo + Heading */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 text-xl font-bold">
                    <span className="text-blue-600 text-2xl">📍</span> Travecta
                </div>
                <h2 className="mt-4 text-2xl font-bold">Create Account</h2>
                <p className="text-gray-500">
                    Sign up to start planning your amazing trips
                </p>
            </div>

            {/* Card */}
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm">
                <h3 className="font-semibold text-lg mb-4">Sign Up</h3>

                <form onSubmit={handleSignup}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Photo URL</label>
                        <input
                            type="url"
                            name="photoURL"
                            placeholder="Enter photo URL"
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
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
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="off"
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
                        Sign Up <FaUserPlus />
                    </button>
                </form>

                {/* Login link */}
                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-medium">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
