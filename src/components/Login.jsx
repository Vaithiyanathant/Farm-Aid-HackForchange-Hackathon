/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebaseconfig"; // Ensure the path is correct
import { signInWithPopup } from "firebase/auth";

const Login = () => {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		setError("");
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const url = user.photoURL;
			localStorage.setItem("profileImage", url);
			navigate("/home");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className='flex items-center justify-center min-h-screen bg-green-50'>
			<div className='bg-white flex rounded-lg shadow-xl max-w-md w-full p-8'>
				<div className='w-full'>
					<h2 className='text-4xl font-bold text-green-700 mb-6'>Sign In</h2>
					<p className='text-base text-gray-700 mb-8'>
						Welcome to the{" "}
						<span className='font-semibold text-green-600'>
							Farm Management Dashboard
						</span>
						! Manage your farm efficiently with tools for monitoring crops,
						analyzing soil health, and planning your farming activities. Sign in
						to access personalized insights and recommendations tailored to your
						farm's needs.
					</p>
					{error && <p className='text-red-500 mb-6'>{error}</p>}
					<button
						onClick={handleGoogleSignIn}
						className='w-full py-3 bg-green-600 text-white border border-transparent rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors'>
						<span className='text-lg font-semibold'>Sign in with Google</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Login;
