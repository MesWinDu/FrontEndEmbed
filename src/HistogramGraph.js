import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistogramGraph = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: data.labels
          },
          y: {
            beginAtZero: true,
            stepSize: 1 // Set step size to 1 to force integer ticks
            ,ticks: {
              precision: 0
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 30, // Adjust the top padding to make space for the title
            bottom: 0
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        barPercentage: 0.8,
        categoryPercentage: 0.8
      }
    });

    return () => chart.destroy();
  }, [data, title]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{title}</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default HistogramGraph;
