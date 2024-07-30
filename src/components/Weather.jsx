/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	BarChart,
	Bar,
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from "recharts";
import Nav from "./Nav";

const cities = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Kolkata"];
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff007c"];

const Weather = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState(null);
	const [selectedCity, setSelectedCity] = useState("Chennai");

	useEffect(() => {
		const fetchWeatherData = async () => {
			const options = {
				method: "GET",
				url: `https://open-weather13.p.rapidapi.com/city/${selectedCity}/EN`,
				headers: {
					"x-rapidapi-key":
						"8e004155bdmsh7e1745ef0ad80a2p12a799jsn62c5bbcd1042",
					"x-rapidapi-host": "open-weather13.p.rapidapi.com",
				},
			};

			try {
				const response = await axios.request(options);
				setWeatherData(response.data);
			} catch (error) {
				setError("Error fetching weather data: " + error.message);
			}
		};

		fetchWeatherData();
	}, [selectedCity]);

	if (!weatherData) {
		return (
			<div className='p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4'>
				<p className='text-center text-gray-700'>Loading...</p>
			</div>
		);
	}

	const { coord, weather, main, visibility, wind, clouds, sys, name } =
		weatherData;
	const weatherCondition = weather[0] || {};

	const data = [
		{ name: "Temperature", value: main.temp },
		{ name: "Feels Like", value: main.feels_like },
		{ name: "Min Temp", value: main.temp_min },
		{ name: "Max Temp", value: main.temp_max },
		{ name: "Humidity", value: main.humidity },
		{ name: "Pressure", value: main.pressure },
	];

	const barData = [
		{ name: "Temperature", value: main.temp },
		{ name: "Humidity", value: main.humidity },
		{ name: "Pressure", value: main.pressure },
	];

	const radarData = [
		{ subject: "Temperature", A: main.temp, B: main.feels_like },
		{ subject: "Humidity", A: main.humidity, B: 100 - main.humidity },
		{ subject: "Pressure", A: main.pressure, B: 1015 - main.pressure },
	];

	return (
		<>
			<Nav />
			<div className='p-6 max-w-6xl mx-auto bg-green-50 rounded-xl shadow-lg space-y-6'>
				<h1 className='text-4xl font-bold mb-6 text-center text-green-800'>
					Weather Dashboard for {name}
				</h1>

				{/* Dropdown for City Selection */}
				<div className='flex justify-center mb-6'>
					<div className='w-full max-w-xs'>
						<label className='block text-lg font-medium mb-2 text-center text-gray-800'>
							Select City:
						</label>
						<select
							value={selectedCity}
							onChange={(e) => setSelectedCity(e.target.value)}
							className='p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500'>
							{cities.map((city) => (
								<option
									key={city}
									value={city}>
									{city}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Weather Information */}
				<div className='bg-green-100 p-6 rounded-lg shadow-lg'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<p className='text-gray-800'>
							<strong>Location:</strong> Latitude {coord.lat}, Longitude{" "}
							{coord.lon}
						</p>
						<p className='text-gray-800'>
							<strong>Weather:</strong> {weatherCondition.main} -{" "}
							{weatherCondition.description}
						</p>
						<p className='text-gray-800'>
							<strong>Temperature:</strong> {main.temp}°F (Feels like{" "}
							{main.feels_like}°F)
						</p>
						<p className='text-gray-800'>
							<strong>Min Temperature:</strong> {main.temp_min}°F
						</p>
						<p className='text-gray-800'>
							<strong>Max Temperature:</strong> {main.temp_max}°F
						</p>
						<p className='text-gray-800'>
							<strong>Humidity:</strong> {main.humidity}%
						</p>
						<p className='text-gray-800'>
							<strong>Pressure:</strong> {main.pressure} hPa
						</p>
						<p className='text-gray-800'>
							<strong>Visibility:</strong> {visibility} meters
						</p>
						<p className='text-gray-800'>
							<strong>Wind Speed:</strong> {wind.speed} m/s at {wind.deg}°
						</p>
						<p className='text-gray-800'>
							<strong>Cloudiness:</strong> {clouds.all}%
						</p>
						<p className='text-gray-800'>
							<strong>Sunrise:</strong>{" "}
							{new Date(sys.sunrise * 1000).toLocaleTimeString()}
						</p>
						<p className='text-gray-800'>
							<strong>Sunset:</strong>{" "}
							{new Date(sys.sunset * 1000).toLocaleTimeString()}
						</p>
					</div>
				</div>

				{/* Charts and Visualizations */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* Pie Chart */}
					<div className='bg-green-100 p-6 rounded-lg shadow-lg'>
						<h2 className='text-xl font-semibold mb-4 text-center text-green-800'>
							Weather Data Distribution
						</h2>
						<ResponsiveContainer
							width='100%'
							height={300}>
							<PieChart>
								<Pie
									data={data}
									dataKey='value'
									nameKey='name'
									outerRadius={100}
									fill='#8884d8'
									label>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Line Chart */}
					<div className='bg-green-100 p-6 rounded-lg shadow-lg'>
						<h2 className='text-xl font-semibold mb-4 text-center text-green-800'>
							Temperature Trends
						</h2>
						<ResponsiveContainer
							width='100%'
							height={300}>
							<LineChart data={data}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Line
									type='monotone'
									dataKey='value'
									stroke='#8884d8'
									activeDot={{ r: 8 }}
								/>
								<Tooltip />
								<Legend />
							</LineChart>
						</ResponsiveContainer>
					</div>

					{/* Bar Chart */}
					<div className='bg-green-100 p-6 rounded-lg shadow-lg'>
						<h2 className='text-xl font-semibold mb-4 text-center text-green-800'>
							Weather Parameters
						</h2>
						<ResponsiveContainer
							width='100%'
							height={300}>
							<BarChart data={barData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Bar
									dataKey='value'
									fill='#82ca9d'
								/>
								<Tooltip />
								<Legend />
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Radar Chart */}
					<div className='bg-green-100 p-6 rounded-lg shadow-lg'>
						<h2 className='text-xl font-semibold mb-4 text-center text-green-800'>
							Radar Chart of Weather Parameters
						</h2>
						<ResponsiveContainer
							width='100%'
							height={300}>
							<RadarChart
								cx='50%'
								cy='50%'
								outerRadius='80%'
								data={radarData}>
								<PolarGrid />
								<PolarAngleAxis dataKey='subject' />
								<PolarRadiusAxis />
								<Radar
									name='Current'
									dataKey='A'
									stroke='#8884d8'
									fill='#8884d8'
									fillOpacity={0.6}
								/>
								<Radar
									name='Expected'
									dataKey='B'
									stroke='#82ca9d'
									fill='#82ca9d'
									fillOpacity={0.6}
								/>
								<Tooltip />
								<Legend />
							</RadarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</>
	);
};

export default Weather;
