import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PressureChart = () => {
  const [pressureData, setPressureData] = useState([]);
  const chartRef = useRef(null);

  // Dummy function to simulate data from the machine
  const fetchDataFromMachine = () => {
    // Simulating pressure data ranging from 0 to 100
    const newPressureValue = Math.floor(Math.random() * 15);
    setPressureData(prevData => [...prevData, newPressureValue]);
  };

  useEffect(() => {
    const interval = setInterval(fetchDataFromMachine, 500); // Fetch data every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (chartRef.current && pressureData.length > 0) {
      const chart = chartRef.current;

      // Add new data point to the existing chart
      chart.data.labels.push(chart.data.labels.length + 1);
      chart.data.datasets[0].data.push(pressureData[pressureData.length - 1]);

      // Update the chart
      chart.update();
    }
  }, [pressureData]);

  useEffect(() => {
    // Create initial chart
    const ctx = document.getElementById('pressureChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Pressure',
          data: [],
          borderColor: 'blue',
          borderWidth: 1,
          fill: 'start' // Fill the area under the line
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100 // Adjust according to your pressure range
          }
        },
        elements: {
          point: {
            radius: 0 // Set point radius to 0 to hide points
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup chart on unmount
      }
    };
  }, []);

  return (
    <div style={{height:"300px",width:"500px"}}>
      <canvas id="pressureChart" width="400" height="200"></canvas>
    </div>
  );
};

export default PressureChart;
