import React, { useRef } from 'react';
import Chart from 'chart.js/auto';

const Newgraph = ({ data, title }) => {
  const chartRef = useRef();
  let chart = null;

  // Create chart when component mounts
  React.useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.names,
        datasets: [{
          label: title,
          data: data.total,
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
        barPercentage: 0.8,
        categoryPercentage: 0.8
      }
    });

    // Return cleanup function to destroy the chart when component unmounts
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, title]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{title}</h2>
      <canvas ref={chartRef} width="800" height="400" />
    </div>
  );
};

export default Newgraph;
