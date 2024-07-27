/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeafletMap from "./LeafletMap";
import CropAnalysis from "./CropAnalysis";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Farm from "./components/Farm";
import Weather from "./components/Weather"; // Import the Weather component
import Settings from "./components/settings";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='/home'
					element={<Home />}
				/>
				<Route
					path='/'
					element={<Login />}
				/>
				<Route
					path='/leafletmap'
					element={<LeafletMap />}
				/>
				<Route
					path='/profile'
					element={<Profile />}
				/>
				<Route
					path='/weather'
					element={<Weather />}
				/>
				<Route
					path='/crop-analysis/:stateName'
					element={<CropAnalysis />}
				/>
				<Route
					path='/farm'
					element={<Farm />}
				/>
				<Route
					path='/settings'
					element={<Settings />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
