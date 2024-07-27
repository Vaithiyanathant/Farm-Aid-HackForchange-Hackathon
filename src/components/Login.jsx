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
		<section className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white flex rounded-lg shadow-xl max-w-md w-full p-8'>
				<div className='w-full'>
					<h2 className='text-4xl font-bold text-gray-800 mb-6'>Sign In</h2>
					<p className='text-base text-gray-600 mb-8'>
						Please sign in to continue.
					</p>
					{error && <p className='text-red-500 mb-6'>{error}</p>}

					<button
						onClick={handleGoogleSignIn}
						className='w-full py-3 bg-black text-white border border-transparent rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors'>
						<span className='text-lg font-semibold'>Sign in with Google</span>
					</button>

				</div>
			</div>
		</section>
	);
};

export default Login;
