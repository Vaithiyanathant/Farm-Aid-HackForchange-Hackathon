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
import Nav from "../components/Nav";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaSave,
	FaEdit,
	FaPlug,
	FaBell,
	FaClock,
} from "react-icons/fa";

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
	const [devices, setDevices] = useState([]);
	const [alerts, setAlerts] = useState([]);

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
					// Fetch devices and alerts here
					const devicesData = [
						{
							id: "1",
							name: "Temperature Sensor",
							status: "Online",
							lastUpdated: "2024-07-29 14:00",
						},
						{
							id: "2",
							name: "Soil Moisture Sensor",
							status: "Offline",
							lastUpdated: "2024-07-28 12:00",
						},
					];
					const alertsData = [
						{
							id: "1",
							message: "Temperature sensor disconnected",
							timestamp: "2024-07-28 12:00",
						},
						{
							id: "2",
							message: "Soil moisture level low",
							timestamp: "2024-07-27 10:00",
						},
					];
					setDevices(devicesData);
					setAlerts(alertsData);
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
			<Nav />
			<div className='p-6 bg-gray-100 min-h-screen'>
				<div className='flex flex-col md:flex-row space-x-6'>
					{/* Left Box - Profile Picture and Basic Info */}
					<div className='w-full md:w-1/3 bg-green-50 p-6 rounded-lg shadow-lg'>
						<div className='flex items-center space-x-4'>
							<div className='w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-3xl text-green-700'>
								<FaUser />
							</div>
							<div>
								<h2 className='text-2xl font-bold text-green-800'>
									{profile.name || "John Doe"}
								</h2>
								<p className='text-gray-600'>{profile.role || "Farmer"}</p>
							</div>
						</div>
						<div className='mt-4'>
							<p className='text-gray-700 flex items-center'>
								<FaEnvelope className='mr-2 text-green-600' />
								Email: {profile.email || "john.doe@example.com"}
							</p>
							<p className='text-gray-700 flex items-center'>
								<FaPhone className='mr-2 text-green-600' />
								Phone: {profile.phone || "+1234567890"}
							</p>
							<p className='text-gray-700 flex items-center'>
								<FaMapMarkerAlt className='mr-2 text-green-600' />
								District: {profile.district || "District"}
							</p>
							<p className='text-gray-700 flex items-center'>
								<FaMapMarkerAlt className='mr-2 text-green-600' />
								City: {profile.city || "City"}
							</p>
							{isEditing ? (
								<div>
									<input
										type='text'
										name='name'
										value={formData.name}
										onChange={handleInputChange}
										placeholder='Name'
										className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
									/>
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleInputChange}
										placeholder='Email'
										className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
									/>
									<input
										type='text'
										name='phone'
										value={formData.phone}
										onChange={handleInputChange}
										placeholder='Phone'
										className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
									/>
									<input
										type='text'
										name='district'
										value={formData.district}
										onChange={handleInputChange}
										placeholder='District'
										className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
									/>
									<input
										type='text'
										name='city'
										value={formData.city}
										onChange={handleInputChange}
										placeholder='City'
										className='mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
									/>
									<button
										onClick={handleSave}
										className='mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
										<FaSave className='mr-2' />
										Save
									</button>
								</div>
							) : (
								<button
									onClick={() => setIsEditing(true)}
									className='mt-4 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'>
									<FaEdit className='mr-2' />
									Edit
								</button>
							)}
						</div>
					</div>

					{/* Right Box - Profile Details and Charts */}
					<div className='w-full md:w-2/3'>
						<div className='bg-white p-6 rounded-lg shadow-lg'>
							{/* Line Chart Example */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold mb-2 text-green-700'>
									Activity Trends
								</h4>
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
											stroke='#4CAF50'
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>

							<h3 className='text-xl font-semibold mb-4 text-green-800'>
								Profile Overview
							</h3>
							<p className='text-gray-700 mb-4'>
								Here is an overview of your profile and activities.
							</p>

							{/* IoT Device Status */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold mb-2 text-green-700'>
									IoT Devices
								</h4>
								{devices.length > 0 ? (
									<div className='bg-gray-50 p-4 rounded-lg'>
										<ul className='list-disc list-inside'>
											{devices.map((device) => (
												<li
													key={device.id}
													className='mb-2'>
													<div className='flex items-center justify-between'>
														<span className='font-semibold text-green-800'>
															{device.name}
														</span>
														<span
															className={`px-2 py-1 text-sm rounded-full ${
																device.status === "Online"
																	? "bg-green-100 text-green-700"
																	: "bg-red-100 text-red-700"
															}`}>
															{device.status}
														</span>
													</div>
													<p className='text-gray-600 text-sm'>
														Last Updated: {device.lastUpdated}
													</p>
												</li>
											))}
										</ul>
									</div>
								) : (
									<p>No devices connected.</p>
								)}
							</div>

							{/* Alerts and Notifications */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold mb-2 text-green-700'>
									Recent Alerts
								</h4>
								{alerts.length > 0 ? (
									<div className='bg-yellow-50 p-4 rounded-lg'>
										<ul className='list-disc list-inside'>
											{alerts.map((alert) => (
												<li
													key={alert.id}
													className='mb-2'>
													<div className='flex items-center justify-between'>
														<span className='font-semibold text-yellow-800'>
															<FaBell className='mr-2' />
															{alert.message}
														</span>
														<span className='text-gray-600 text-sm'>
															<FaClock className='mr-1' />
															{alert.timestamp}
														</span>
													</div>
												</li>
											))}
										</ul>
									</div>
								) : (
									<p>No recent alerts.</p>
								)}
							</div>

							{/* Additional Charts and Graphs */}
							<div className='mb-6'>
								<h4 className='text-lg font-semibold mb-2 text-green-700'>
									Performance Summary
								</h4>
								{/* Example Placeholder for Additional Charts */}
								<div className='h-64 bg-green-50 rounded-lg flex items-center justify-center text-gray-600'>
									{/* Add additional chart components here */}
									<p>No additional charts available</p>
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
