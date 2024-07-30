/** @format */

import React, { useState } from "react";
import Nav from "./Nav";
import { FaWifi, FaEthernet, FaBluetooth, FaSave } from "react-icons/fa"; // Correct import path

const Settings = () => {
	const [iotDevices, setIotDevices] = useState({
		device1: { connectionType: "wireless", ipAddress: "" },
		device2: { connectionType: "wired", ipAddress: "" },
		device3: { connectionType: "bluetooth", ipAddress: "" },
	});

	const handleInputChange = (e, device) => {
		const { name, value } = e.target;
		setIotDevices({
			...iotDevices,
			[device]: { ...iotDevices[device], [name]: value },
		});
	};

	const handleSelectChange = (e, device) => {
		const { name, value } = e.target;
		setIotDevices({
			...iotDevices,
			[device]: { ...iotDevices[device], [name]: value },
		});
	};

	const handleSave = () => {
		// Logic to save IoT device connections
		console.log("Saved devices:", iotDevices);
	};

	return (
		<>
			<Nav />
			<div className='p-6 bg-gray-100 min-h-screen'>
				<div className='bg-white p-8 rounded-lg shadow-lg'>
					<h1 className='text-3xl font-bold text-green-800 mb-6'>
						IoT Device Settings
					</h1>
					<p className='text-gray-600 mb-6'>
						Configure your IoT devices below. Ensure all devices are connected
						and properly configured.
					</p>

					{/* Device Connection Forms */}
					<div className='space-y-6'>
						{["device1", "device2", "device3"].map((device, index) => (
							<div
								key={index}
								className='bg-green-50 p-6 rounded-lg shadow-md'>
								<h2 className='text-xl font-semibold text-green-700 mb-4 flex items-center'>
									{index === 0 && <FaWifi className='mr-2 text-green-600' />}
									{index === 1 && (
										<FaEthernet className='mr-2 text-green-600' />
									)}
									{index === 2 && (
										<FaBluetooth className='mr-2 text-green-600' />
									)}
									Device {index + 1}
								</h2>
								<select
									name='connectionType'
									value={iotDevices[device].connectionType}
									onChange={(e) => handleSelectChange(e, device)}
									className='block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'>
									<option value='wireless'>Wireless</option>
									<option value='wired'>Wired</option>
									<option value='bluetooth'>Bluetooth</option>
								</select>
								<input
									type='text'
									name='ipAddress'
									value={iotDevices[device].ipAddress}
									onChange={(e) => handleInputChange(e, device)}
									placeholder={`Enter Device ${index + 1} IP Address`}
									className='block w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none'
								/>
							</div>
						))}
					</div>

					{/* Save Button */}
					<button
						onClick={handleSave}
						className='mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'>
						<FaSave className='mr-2' />
						Save Settings
					</button>
				</div>
			</div>
		</>
	);
};

export default Settings;
