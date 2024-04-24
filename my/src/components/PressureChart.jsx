import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PressureChart = () => {
  const [pressureData, setPressureData] = useState([]);
  const chartRef = useRef(null);

  // Dummy function to simulate data from the machine
  const fetchDataFromMachine = () => {
    // Simulating pressure data ranging from 0 to 100
    const newPressureValue = Math.floor(Math.random() * 100);
    setPressureData(prevData => [...prevData, newPressureValue]);
  };

  useEffect(() => {
    const interval = setInterval(fetchDataFromMachine, 1000); // Fetch data every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (pressureData.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy previous chart if it exists
      }

      const ctx = document.getElementById('pressureChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: pressureData.length }, (_, i) => i + 1),
          datasets: [{
            label: 'Pressure',
            data: pressureData,
            borderColor: 'blue',
            borderWidth: 1,
            fill: {
              target: 'origin',
              above: 'rgba(0, 0, 255, 0.1)', // Color for area above the line
              below: 'rgba(0, 0, 255, 0.1)' // Color for area below the line
            }
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 100 // Adjust according to your pressure range
            }
          }
        }
      });
    }
  }, [pressureData]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup chart on unmount
      }
    };
  }, []);

  return (
    <div style={{height:"800px",width:"800px"}}>
      <canvas id="pressureChart" width="400" height="200"></canvas>
    </div>
  );
};

export default PressureChart;
