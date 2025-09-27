import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Signup = () => {
    const { createNewUser, updateUserProfile, setUser } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleSignup = e => {
        e.preventDefault();
        setError('');

        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photoURL");
        const email = form.get("email");
        const password = form.get("password");

        if (password.length < 6) {
            setError('Password should be at least 6');
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one special character!');
            return;
        }

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            image: photo,
                            role: 'user'
                        };

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "SignUp Success!",
                                        showClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeInUp
                                            animate__faster
                                          `
                                        },
                                        hideClass: {
                                            popup: `
                                            animate__animated
                                            animate__fadeOutDown
                                            animate__faster
                                          `
                                        }
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(err => {
                        setError(err.message)
                    })
            })
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
            {error && <p className="text-red-500 p-4">{error}</p>}
        </div>
    );
};

export default Signup;
