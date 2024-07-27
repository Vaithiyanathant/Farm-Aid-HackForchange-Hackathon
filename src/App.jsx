/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeafletMap from "./LeafletMap";
import CropAnalysis from "./CropAnalysis";
import Home from "./components/Home";
import Login from "./components/Login"; // Default import
import Profile from "./components/Profile";

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
					path='/crop-analysis/:stateName'
					element={<CropAnalysis />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
