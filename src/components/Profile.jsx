/** @format */

import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { db, auth } from "../firebase/firebaseconfig"; // Ensure path is correct
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import Nav from "../components/Nav"
// Sample data for charts
const data = [
	{ name: "Jan", value: 4000 },
	{ name: "Feb", value: 3000 },
	{ name: "Mar", value: 2000 },
	{ name: "Apr", value: 2780 },
	{ name: "May", value: 1890 },
	{ name: "Jun", value: 2390 },
	{ name: "Jul", value: 3490 },
];

const Profile = () => {
	const [profile, setProfile] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		district: "",
		city: "",
	});

	useEffect(() => {
		const fetchProfile = async () => {
			const user = auth.currentUser;
			if (user) {
				try {
					const profileDocRef = doc(db, "profiles", user.uid);
					const profileDoc = await getDoc(profileDocRef);
					if (profileDoc.exists()) {
						setProfile(profileDoc.data());
						setFormData(profileDoc.data());
					}
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};
		fetchProfile();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSave = async () => {
		const user = auth.currentUser;
		if (user) {
			try {
				const profileDocRef = doc(db, "profiles", user.uid);
				await setDoc(profileDocRef, formData);
				setProfile(formData);
				setIsEditing(false);
			} catch (error) {
				console.error("Error saving profile:", error);
			}
		}
	};

	return (
		<>
		<Nav></Nav>
			<div className='p-6 bg-gray-100 min-h-screen'>
				<div className='flex flex-col md:flex-row space-x-6'>
					{/* Left Box - Profile Picture and Basic Info */}
					<div className='w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg'>
						<div className='flex items-center space-x-4'>
							<div>
								<h2 className='text-2xl font-bold'>
									{profile.name || "John Doe"}
								</h2>
								<p className='text-gray-600'>{profile.role || "Farmer"}</p>
							</div>
						</div>
						<div className='mt-4'>
							<p className='text-gray-700'>
								Email: {profile.email || "john.doe@example.com"}
							</p>
							<p className='text-gray-700'>
								Phone: {profile.phone || "+1234567890"}
							</p>
							<p className='text-gray-700'>
								District: {profile.district || "District"}
							</p>
							<p className='text-gray-700'>City: {profile.city || "City"}</p>
							{isEditing ? (
								<div>
									<input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleInputChange}
										placeholder='Name'
										className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded'
									/>
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleInputChange}
										placeholder='Email'
										className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded'
									/>
									<input
										type='text'
										name='phone'
										value={formData.phone}
										onChange={handleInputChange}
										placeholder='Phone'
										className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded'
									/>
									<input
										type='text'
										name='district'
										value={formData.district}
										onChange={handleInputChange}
										placeholder='District'
										className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded'
									/>
									<input
										type='text'
										name='city'
										value={formData.city}
										onChange={handleInputChange}
										placeholder='City'
										className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded'
									/>
									<button
										onClick={handleSave}
										className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
										Save
									</button>
								</div>
							) : (
								<button
									onClick={() => setIsEditing(true)}
									className='mt-4 px-4 py-2 bg-green-500 text-white rounded'>
									Edit
								</button>
							)}
						</div>
					</div>

					{/* Right Box - Profile Details and Charts */}
					<div className='w-full md:w-2/3'>
						<div className='bg-white p-6 rounded-lg shadow-lg'>
							<h3 className='text-xl font-semibold mb-4'>Profile Overview</h3>
							<p className='text-gray-700 mb-4'>
								Here is an overview of your profile and activities.
							</p>

							{/* Line Chart Example */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold mb-2'>Activity Trends</h4>
								<ResponsiveContainer
									width='100%'
									height={300}>
									<LineChart data={data}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line
											type='monotone'
											dataKey='value'
											stroke='#8884d8'
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>

							{/* Additional Charts and Graphs */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold mb-2'>
									Performance Summary
								</h4>
								{/* Example Placeholder for Additional Charts */}
								<div className='h-64 bg-gray-200 rounded-lg'>
									{/* Add additional chart components here */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
