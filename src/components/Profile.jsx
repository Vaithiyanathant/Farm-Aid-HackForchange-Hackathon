/** @format */

import React from "react";
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
	return (
		<div className='p-6 bg-gray-100 min-h-screen'>
			<div className='flex space-x-6'>
				{/* Left Box - Profile Picture and Basic Info */}
				<div className='w-1/3 bg-white p-6 rounded-lg shadow-lg'>
					<div className='flex items-center space-x-4'>
						<img
							src='https://via.placeholder.com/150'
							alt='Profile'
							className='w-24 h-24 rounded-full border-2 border-gray-300'
						/>
						<div>
							<h2 className='text-2xl font-bold'>John Doe</h2>
							<p className='text-gray-600'>Farmer</p>
						</div>
					</div>
					<div className='mt-4'>
						<p className='text-gray-700'>Email: john.doe@example.com</p>
						<p className='text-gray-700'>Phone: +1234567890</p>
						<p className='text-gray-700'>Location: Springfield</p>
					</div>
				</div>

				{/* Right Box - Profile Details and Charts */}
				<div className='w-2/3'>
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
	);
};

export default Profile;
