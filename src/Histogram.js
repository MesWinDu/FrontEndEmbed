import React, { useRef } from 'react';
import Chart from 'chart.js/auto';

const Histogram = ({ data, title }) => {
    const chartRef = useRef();
    let chart = null;

    // Create chart when component mounts
    React.useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.time,
                datasets: [{
                    label: title,
                    data: data.totalpresent,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    barPercentage: 1,
                    categoryPercentage: 1,
                }]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        position: 'bottom', // Position the x-axis on the bottom
                        grid: {
                            display: true,
                            drawBorder: false, // To hide the border line between the x-axis and the chart area
                            drawTicks: false, // To hide the ticks on the x-axis
                        },
                        ticks: {
                            beginAtZero: true, // Start the ticks at 0
                            align: 'end' // Align ticks to the end of the axis
                            
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        ticks:{
                            precision: 0
                        }
                    }
                },
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

export default Histogram;
