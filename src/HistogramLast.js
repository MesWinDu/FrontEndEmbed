
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HistogramGraphLast = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = document.getElementById('histogram').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00" ],
        datasets: [{
          label: title,
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }]
      },
      options: {
        scales: {
          x: [{
            display: false,
            barPercentage: 1.3,
            ticks: {
              max: 3,
            }
          }, {
            display: true,
            ticks: {
              autoSkip: false,
              max: 4,
            }
          }],
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

export default HistogramGraphLast;
