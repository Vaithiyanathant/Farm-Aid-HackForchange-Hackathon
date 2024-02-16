import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";

const CropAnalysis = () => {
  const productionAreaChartRef = useRef(null);
  const profitPercentageChartRef = useRef(null);
  const avgProfitPercentageChartRef = useRef(null);

  const productionAreaChartInstance = useRef(null);
  const profitPercentageChartInstance = useRef(null);
  const avgProfitPercentageChartInstance = useRef(null);

  const { stateName } = useParams();

  // Define data manually
  const cropData = [
    {
      cropId: 1,
      cropName: "Bajra",
      cropSeason: "Kharif",
      cropArea: 152700,
      cropProduction: 108900,
      State: "Maharashtra",
      NameOfBC: "Green Fields Agribusiness",
      ContactNumber: 9876543210,
      Gender: "male",
      BankName: "State Bank of Maharashtra",
      District: "Pune",
      OfficeName: "Pune Main SO",
      Pincode: 411001,
    },
    {
      cropId: 2,
      cropName: "Wheat",
      cropSeason: "Rabi",
      cropArea: 120000,
      cropProduction: 95000,
      State: "Maharashtra",
      NameOfBC: "Green Fields Agribusiness",
      ContactNumber: 9876543210,
      Gender: "male",
      BankName: "State Bank of Maharashtra",
      District: "Pune",
      OfficeName: "Pune Main SO",
      Pincode: 411001,
    },
    {
      cropId: 3,
      cropName: "Rice",
      cropSeason: "Kharif",
      cropArea: 180000,
      cropProduction: 135000,
      State: "Maharashtra",
      NameOfBC: "Green Fields Agribusiness",
      ContactNumber: 9876543210,
      Gender: "male",
      BankName: "State Bank of Maharashtra",
      District: "Pune",
      OfficeName: "Pune Main SO",
      Pincode: 411001,
    },
    // Add more fake crop data as needed
  ];
  

  useEffect(() => {
    if (cropData.length) {
      // Filter cropData based on the matching state
      const filteredCropData = cropData.filter((crop) => crop.State === stateName);

      if (filteredCropData.length === 0) {
        console.log(`No crop data available for state: ${stateName}`);
        return;
      }

      // Destroy existing chart instances
      if (productionAreaChartInstance.current) {
        productionAreaChartInstance.current.destroy();
      }

      if (profitPercentageChartInstance.current) {
        profitPercentageChartInstance.current.destroy();
      }

      if (avgProfitPercentageChartInstance.current) {
        avgProfitPercentageChartInstance.current.destroy();
      }

      // Calculate average profit percentage
      const avgProfitPercentage =
        filteredCropData.reduce(
          (sum, crop) => sum + ((crop.cropProduction / crop.cropArea) * 100 || 0),
          0
        ) / filteredCropData.length;

      // Create a chart for production and area
      const productionAreaCtx = productionAreaChartRef.current.getContext("2d");
      productionAreaChartInstance.current = new Chart(productionAreaCtx, {
        type: "bar",
        data: {
          labels: filteredCropData.map((crop) => crop.cropName),
          datasets: [
            {
              label: "Crop Production",
              data: filteredCropData.map((crop) => crop.cropProduction),
              backgroundColor: "rgba(54, 162, 235, 0.8)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Crop Area",
              data: filteredCropData.map((crop) => crop.cropArea),
              backgroundColor: "rgba(255, 99, 132, 0.8)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      });

      // Create a separate chart for profit percentage
      const profitPercentageCtx = profitPercentageChartRef.current.getContext("2d");
      profitPercentageChartInstance.current = new Chart(profitPercentageCtx, {
        type: "line",
        data: {
          labels: filteredCropData.map((crop) => crop.cropName),
          datasets: [
            {
              label: "Profit Percentage",
              data: filteredCropData.map((crop) =>
                ((crop.cropProduction / crop.cropArea) * 100).toFixed(2)
              ),
              backgroundColor: "rgba(75, 192, 192, 0.8)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });

      // Create a chart for average profit percentage
      const avgProfitPercentageCtx = avgProfitPercentageChartRef.current.getContext("2d");
      avgProfitPercentageChartInstance.current = new Chart(avgProfitPercentageCtx, {
        type: "bar",
        data: {
          labels: ["Average Profit Percentage"],
          datasets: [
            {
              data: [avgProfitPercentage.toFixed(2)],
              backgroundColor: "rgba(255, 206, 86, 0.8)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }
  }, [stateName]);

  return (
    <div className="w-full lg:w-2/3 mx-auto mt-8">
      <h2 className="text-xl font-semibold text-center mb-10">
        Crop Production, Area, Profit Percentage, and Average Profit Percentage Graphs
      </h2>
      <canvas ref={productionAreaChartRef} className="w-full h-auto mb-20" />
      <h2 className="text-xl font-semibold text-center mb-4">Profit Percentage</h2>
      <canvas ref={profitPercentageChartRef} className="w-full h-auto mt-8 mb-10" />
      <h2 className="text-xl font-semibold text-center mb-4">Average Profit Percentage</h2>
      <canvas ref={avgProfitPercentageChartRef} className="w-full h-auto mt-8 mb-10" />
    </div>
  );
};

export default CropAnalysis;
