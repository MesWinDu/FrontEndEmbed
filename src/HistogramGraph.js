import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistogramGraph = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.names,
        datasets: [{
          label: title,
          data: data.totallate,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            beginAtZero: true,
            labels: data.names,
            offset: true,
            grid: {
              display: false
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 0,
              fontSize: 10 // Adjust font size as needed
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
            top: 30,
            bottom: 0
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        barPercentage: 1,
        categoryPercentage: 1
      }
    });

    return () => chart.destroy();
  }, [data, title]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{title}</h2>
      <canvas ref={chartRef} width="800" height="400" />
    </div>
  );
};

export default HistogramGraph;
