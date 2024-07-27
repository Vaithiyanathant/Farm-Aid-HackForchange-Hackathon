/** @format */

import React, { useState } from "react";
import Nav from "./Nav";

const Settings = () => {
	const [iotDevices, setIotDevices] = useState({
		device1: "",
		device2: "",
		device3: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setIotDevices({ ...iotDevices, [name]: value });
	};

	const handleSave = () => {
		// Logic to save IoT device connections
		console.log("Saved devices:", iotDevices);
	};

	return (
		<>
			<Nav></Nav>
			<div className='p-6 bg-gray-100 min-h-screen'>
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<h1 className='text-2xl font-bold mb-4'>IoT Device Settings</h1>
					<p className='text-gray-600 mb-4'>
						Configure your IoT devices below. Make sure all devices are
						connected and properly configured.
					</p>

					{/* Device Connection Forms */}
					<div className='space-y-4'>
						<div className='bg-gray-50 p-4 rounded-lg shadow-md'>
							<h2 className='text-xl font-semibold mb-2'>Device 1</h2>
							<input
								type='text'
								name='device1'
								value={iotDevices.device1}
								onChange={handleInputChange}
								placeholder='Enter Device 1 Connection'
								className='block w-full px-3 py-2 border border-gray-300 rounded'
							/>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg shadow-md'>
							<h2 className='text-xl font-semibold mb-2'>Device 2</h2>
							<input
								type='text'
								name='device2'
								value={iotDevices.device2}
								onChange={handleInputChange}
								placeholder='Enter Device 2 Connection'
								className='block w-full px-3 py-2 border border-gray-300 rounded'
							/>
						</div>

						<div className='bg-gray-50 p-4 rounded-lg shadow-md'>
							<h2 className='text-xl font-semibold mb-2'>Device 3</h2>
							<input
								type='text'
								name='device3'
								value={iotDevices.device3}
								onChange={handleInputChange}
								placeholder='Enter Device 3 Connection'
								className='block w-full px-3 py-2 border border-gray-300 rounded'
							/>
						</div>
					</div>

					{/* Save Button */}
					<button
						onClick={handleSave}
						className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
						Save Settings
					</button>
				</div>
			</div>
		</>
	);
};

export default Settings;
