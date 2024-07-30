/** @format */

import React from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import IrrigationSystem from "./IrrigationSystem";
import Nav from "./Nav";

// Sample data for charts
const soilData = [
	{ name: "Jan", moisture: 400, pH: 6.5, nutrients: 50 },
	{ name: "Feb", moisture: 350, pH: 6.3, nutrients: 45 },
	{ name: "Mar", moisture: 300, pH: 6.2, nutrients: 48 },
	{ name: "Apr", moisture: 280, pH: 6.4, nutrients: 50 },
	{ name: "May", moisture: 320, pH: 6.5, nutrients: 47 },
	{ name: "Jun", moisture: 310, pH: 6.6, nutrients: 49 },
	{ name: "Jul", moisture: 350, pH: 6.7, nutrients: 52 },
];

const weatherData = [
	{ name: "Jan", temp: 15, humidity: 30, rainfall: 40, wind: 5 },
	{ name: "Feb", temp: 17, humidity: 35, rainfall: 45, wind: 7 },
	{ name: "Mar", temp: 20, humidity: 40, rainfall: 50, wind: 6 },
	{ name: "Apr", temp: 22, humidity: 50, rainfall: 55, wind: 4 },
	{ name: "May", temp: 25, humidity: 60, rainfall: 60, wind: 8 },
	{ name: "Jun", temp: 27, humidity: 65, rainfall: 65, wind: 10 },
	{ name: "Jul", temp: 30, humidity: 70, rainfall: 70, wind: 12 },
];

const cropHealthData = [
	{ name: "Week 1", pest: 10, disease: 5, growth: 50 },
	{ name: "Week 2", pest: 12, disease: 6, growth: 55 },
	{ name: "Week 3", pest: 8, disease: 4, growth: 60 },
	{ name: "Week 4", pest: 15, disease: 7, growth: 65 },
	{ name: "Week 5", pest: 9, disease: 5, growth: 70 },
	{ name: "Week 6", pest: 11, disease: 6, growth: 75 },
	{ name: "Week 7", pest: 13, disease: 7, growth: 80 },
];

const irrigationData = {
	status: "Irrigating",
	currentUsage: 120,
	recommendedUsage: 110,
};

const sunlightExposure = "High";

const calculateRisk = (current, recommended) => {
	const difference = current - recommended;
	if (difference > 50) return "High";
	if (difference < 50) return "Low";
	return "Correct";
};

const Farm = () => {
	const risk = calculateRisk(
		irrigationData.currentUsage,
		irrigationData.recommendedUsage
	);

	return (
		<>
			<Nav />
			<div className='p-6 bg-green-50 min-h-screen'>
				<h1 className='text-3xl font-bold text-green-800 mb-6'>
					Smart Farming Assistant
				</h1>
				<div className='flex flex-wrap -mx-6'>
					{/* Real-time Soil Monitoring */}
					<IrrigationSystem />

					{/* Crop Health Monitoring */}
					<div className='w-full lg:w-1/2 p-6'>
						<div className='bg-white p-6 rounded-lg shadow-lg'>
							<h2 className='text-xl font-semibold text-green-700 mb-4'>
								Crop Health Monitoring
							</h2>
							<ResponsiveContainer
								width='100%'
								height={300}>
								<BarChart data={cropHealthData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar
										dataKey='pest'
										fill='#FF7043'
										name='Pest Detection'
									/>
									<Bar
										dataKey='disease'
										fill='#64B5F6'
										name='Disease Detection'
									/>
									<Bar
										dataKey='growth'
										fill='#4DB6AC'
										name='Growth Tracking'
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className='w-full lg:w-1/2 p-6'>
						<div className='bg-white p-6 rounded-lg shadow-lg'>
							<h2 className='text-xl font-semibold text-green-700 mb-4'>
								Soil Monitoring
							</h2>
							<ResponsiveContainer
								width='100%'
								height={300}>
								<LineChart data={soilData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line
										type='monotone'
										dataKey='moisture'
										stroke='#F57C00'
										name='Moisture Levels'
									/>
									<Line
										type='monotone'
										dataKey='pH'
										stroke='#C2185B'
										name='pH Levels'
									/>
									<Line
										type='monotone'
										dataKey='nutrients'
										stroke='#00796B'
										name='Nutrient Levels'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Weather Station Integration */}
					<div className='w-full lg:w-1/2 p-6'>
						<div className='bg-white p-6 rounded-lg shadow-lg'>
							<h2 className='text-xl font-semibold text-green-700 mb-4'>
								Weather Station
							</h2>
							<ResponsiveContainer
								width='100%'
								height={300}>
								<LineChart data={weatherData}>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Legend />
									<Line
										type='monotone'
										dataKey='temp'
										stroke='#D32F2F'
										name='Temperature'
									/>
									<Line
										type='monotone'
										dataKey='humidity'
										stroke='#1976D2'
										name='Humidity'
									/>
									<Line
										type='monotone'
										dataKey='rainfall'
										stroke='#388E3C'
										name='Rainfall'
									/>
									<Line
										type='monotone'
										dataKey='wind'
										stroke='#FBC02D'
										name='Wind Speed'
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Farm;
