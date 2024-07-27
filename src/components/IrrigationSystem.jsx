/** @format */

import React, { useState } from "react";
import Nav from "./Nav";

const IrrigationSystem = () => {
	const [isIrrigating, setIsIrrigating] = useState(false);
	const [currentUsage, setCurrentUsage] = useState(120); // Example current water usage
	const [recommendedUsage, setRecommendedUsage] = useState(110); // Example recommended water usage
	const [risk, setRisk] = useState(
		calculateRisk(currentUsage, recommendedUsage)
	);
	const [sunlightExposure, setSunlightExposure] = useState("Mid"); // Example sunlight exposure

	function calculateRisk(current, recommended) {
		const difference = Math.abs(current - recommended);
		if (difference > 50) return "High";
		if (difference < 50) return "Low";
		return "Correct";
	}

	const handleToggleIrrigation = () => {
		setIsIrrigating(!isIrrigating);
	};

	const increaseWaterFlow = () => {
		setCurrentUsage((prev) => {
			const newUsage = prev + 10;
			setRisk(calculateRisk(newUsage, recommendedUsage));
			return newUsage;
		});
	};

	const decreaseWaterFlow = () => {
		setCurrentUsage((prev) => {
			const newUsage = prev - 10;
			setRisk(calculateRisk(newUsage, recommendedUsage));
			return newUsage;
		});
	};

	return (
		<>
			<div className='w-full lg:w-1/2 p-6'>
				{/* Irrigation System */}
				<div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
					<h2 className='text-xl font-semibold mb-4'>Irrigation System</h2>
					<div className='flex items-center mb-4'>
						<p
							className={`text-lg font-semibold ${
								isIrrigating ? "text-green-500" : "text-red-500"
							}`}>
							Status: {isIrrigating ? "Irrigating" : "Not Irrigating"}
						</p>
					</div>
					<div className='mb-4'>
						<p className='text-gray-700'>
							Current Water Usage:{" "}
							<span className='font-semibold'>{currentUsage}L</span>
						</p>
						<p className='text-gray-700'>
							Recommended Water Usage by AI:{" "}
							<span className='font-semibold'>{recommendedUsage}L</span>
						</p>
						<p
							className={`text-lg font-semibold ${
								risk === "High"
									? "text-red-500"
									: risk === "Low"
									? "text-yellow-500"
									: "text-green-500"
							}`}>
							Risk: {risk}
						</p>
					</div>
					<div className='flex space-x-4 mb-4'>
						<button
							onClick={handleToggleIrrigation}
							className={`px-4 py-2 rounded ${
								isIrrigating
									? "bg-red-500 text-white hover:bg-red-600"
									: "bg-green-500 text-white hover:bg-green-600"
							}`}>
							{isIrrigating ? "Turn Off" : "Turn On"}
						</button>
					</div>
					<div className='flex space-x-4'>
						<button
							onClick={increaseWaterFlow}
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
							Increase Water Flow
						</button>
						<button
							onClick={decreaseWaterFlow}
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
							Decrease Water Flow
						</button>
					</div>
				</div>

				{/* Sunlight Exposure */}
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-xl font-semibold mb-4'>Sunlight Exposure</h2>
					<p
						className={`text-lg font-semibold ${
							sunlightExposure === "High"
								? "text-red-500"
								: sunlightExposure === "Low"
								? "text-yellow-500"
								: "text-green-500"
						}`}>
						Status: {sunlightExposure}
					</p>
				</div>
			</div>
		</>
	);
};

export default IrrigationSystem;
