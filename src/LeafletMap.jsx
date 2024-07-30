/** @format */

// LeafletMap.jsx

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Nav from "./components/Nav";
import { useNavigate } from "react-router-dom";

const LeafletMap = () => {
	const [showTable, setShowTable] = useState(true);
	const [selectedState, setSelectedState] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const mapContainer = document.getElementById("map");
		if (mapContainer && !mapContainer._leaflet_id) {
			const map = L.map("map").setView([20.5937, 78.9629], 5);
			var locationMarker;

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			var cropData = [
				{
					cropId: 1,
					cropName: "Bajra",
					cropSeason: "Kharif",
					cropArea: 152700,
					cropProduction: 108900,
					State: "Maharashtra",
				},
				{
					cropId: 2,
					cropName: "Wheat",
					cropSeason: "Rabi",
					cropArea: 120000,
					cropProduction: 95000,
					State: "Maharashtra",
				},
				{
					cropId: 3,
					cropName: "Rice",
					cropSeason: "Kharif",
					cropArea: 180000,
					cropProduction: 135000,
					State: "Maharashtra",
				},
				// Add more crop data as needed
				{
					cropId: 4,
					cropName: "Jowar",
					cropSeason: "Rabi",
					cropArea: 90000,
					cropProduction: 72000,
					State: "Maharashtra",
				},
				{
					cropId: 5,
					cropName: "Barley",
					cropSeason: "Winter",
					cropArea: 45000,
					cropProduction: 36000,
					State: "Maharashtra",
				},
				{
					cropId: 6,
					cropName: "Maize",
					cropSeason: "Kharif",
					cropArea: 200000,
					cropProduction: 160000,
					State: "Maharashtra",
				},

				{
					cropId: 7,
					cropName: "Sugarcane",
					cropSeason: "Whole Year",
					cropArea: 250000,
					cropProduction: 500000,
					State: "Uttar Pradesh",
				},
				{
					cropId: 8,
					cropName: "Paddy",
					cropSeason: "Kharif",
					cropArea: 300000,
					cropProduction: 225000,
					State: "Uttar Pradesh",
				},
				{
					cropId: 9,
					cropName: "Potato",
					cropSeason: "Rabi",
					cropArea: 100000,
					cropProduction: 80000,
					State: "Uttar Pradesh",
				},

				{
					cropId: 10,
					cropName: "Cotton",
					cropSeason: "Kharif",
					cropArea: 150000,
					cropProduction: 120000,
					State: "Gujarat",
				},
				{
					cropId: 11,
					cropName: "Groundnut",
					cropSeason: "Rabi",
					cropArea: 80000,
					cropProduction: 64000,
					State: "Gujarat",
				},
				{
					cropId: 12,
					cropName: "Castor",
					cropSeason: "Summer",
					cropArea: 30000,
					cropProduction: 24000,
					State: "Gujarat",
				},

				// Add more states and fake data
				{
					cropId: 13,
					cropName: "Corn",
					cropSeason: "Kharif",
					cropArea: 120000,
					cropProduction: 96000,
					State: "Madhya Pradesh",
				},
				{
					cropId: 14,
					cropName: "Soybean",
					cropSeason: "Rabi",
					cropArea: 150000,
					cropProduction: 120000,
					State: "Madhya Pradesh",
				},
				{
					cropId: 15,
					cropName: "Sunflower",
					cropSeason: "Summer",
					cropArea: 40000,
					cropProduction: 32000,
					State: "Madhya Pradesh",
				},

				{
					cropId: 16,
					cropName: "Ragi",
					cropSeason: "Kharif",
					cropArea: 60000,
					cropProduction: 48000,
					State: "Karnataka",
				},
				{
					cropId: 17,
					cropName: "Coffee",
					cropSeason: "Whole Year",
					cropArea: 80000,
					cropProduction: 150000,
					State: "Karnataka",
				},
				{
					cropId: 18,
					cropName: "Areca Nut",
					cropSeason: "Summer",
					cropArea: 30000,
					cropProduction: 60000,
					State: "Karnataka",
				},
			];

			function createDiv(crop) {
				const cropDiv = document.createElement("div");
				cropDiv.className = "w-full px-4 mb-1"; // Adjusted margin and padding values

				if (crop) {
					cropDiv.innerHTML = `
            <div class="bg-black text-white w-[30px]">
              <div class="text-lg "> ${crop.cropName || "N/A"}</div>
            </div>
          `;
				} else {
					cropDiv.innerHTML = "<div>Data not available</div>";
				}

				cropDiv.addEventListener("click", () => makeAnalysis(crop.State));

				document.getElementById("info-div-container").appendChild(cropDiv);
			}

			function fetchCropsInState(state) {
				return cropData.filter(
					(crop) => crop.State.toLowerCase() === state.toLowerCase()
				);
			}

			map.on("click", function (e) {
				if (locationMarker) {
					map.removeLayer(locationMarker);
				}

				var url =
					"https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
					e.latlng.lat +
					"&lon=" +
					e.latlng.lng;
				fetch(url)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						if (data && data.address && data.address.state) {
							var state = data.address.state;

							locationMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(
								map
							);
							locationMarker.bindPopup(`Selected State: ${state}`).openPopup();

							var cropsInState = fetchCropsInState(state);

							document.getElementById("info-div-container").innerHTML = "";

							if (cropsInState.length > 0) {
								cropsInState.forEach(function (crop) {
									createDiv(crop);
								});
							} else {
								createDiv({
									Message: "No crops available in the selected state.",
								});
							}

							setSelectedState(state); // Set selected state
						} else {
							console.log("State information not available in the response.");
						}
					})
					.catch(function (error) {
						console.log("Error geocoding coordinates: " + error);
					});
			});
		}
	}, []);

	function makeAnalysis(state) {
		setSelectedState(state); // Set selected state for analysis
		setShowTable(false);

		// Redirect to crop-analysis route
		navigate(`/crop-analysis/${encodeURIComponent(state)}`);

	//	window.location.href = `/crop-analysis/${encodeURIComponent(state)}`;
	}

	return (
		<>
			<Nav></Nav>
			<div className='flex flex-col lg:flex-row bg-black'>
				<div
					id='map'
					className='w-full h-64 lg:h-full border-r'
					style={{ minHeight: "900px" }}
				/>

				<div className='flex flex-col p-4'>
					<h1 className='mb-5 text-2xl text-white'>
						List of Available Crops :
					</h1>
					<div
						id='info-div-container'
						className='flex flex-wrap border-2 border-blue-500 p-2 mb-4 rounded-lg'>
						{/* Place your crop information components here */}
					</div>
					<div className='border-2 border-gray-500 p-2 rounded-md cursor-pointer text-white'>
						Click Here to get Detailed Analysis.
					</div>
				</div>
			</div>
		</>
	);
};

export default LeafletMap;
