// import  Chart  from "chart.js";
// // const axios = require("axios");

// // let respond;

// // axios.get('http://localhost:3000/fetchdata')
// //   .then(response => {
// //     respond = response.data;
// //     console.log(respond);
// //   })
// //   .catch(error => {
// //     console.error('Error fetching data:', error);
// //   });

// // const data = [{}]
// // data[0] = {asdasd:"sadads",asdsad:"dasd"}
// // data[1] = {asdasd:"sadads",asdsad:"dasd"}
// // console.log(data)

// // const today = new Date();
// // const dateOnly = today.toISOString().slice(0, 10); // Extracts characters from index 0 to 10 (yyyy-mm-dd)
// // console.log(dateOnly);



// const ctx = document.getElementById('histogram').getContext('2d');

// const chart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: [0, 1, 2, 3, 4],
//     datasets: [{
//       label: 'Number of Arrivals',
//       data: [19, 28, 20, 16],
//       backgroundColor: 'green',
//     }]
//   },
//   options: {
//     scales: {
//       xAxes: [{
//         display: false,
//         barPercentage: 1.3,
//         ticks: {
//           max: 3,
//         }
//       }, {
//         display: true,
//         ticks: {
//           autoSkip: false,
//           max: 4,
//         }
//       }],
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });


import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const HistogramGraph = () => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [0, 1, 2, 3, 4],
        datasets: [
          {
            label: "Number of Arrivals",
            data: [19, 28, 20, 16],
            backgroundColor: "green",
            barPercentage: 1,
            categoryPercentage: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: true,
              barPercentage: 1.3,
              ticks: {
                max: 3,
              },
            },

            {
              display: true,
              ticks: {
                autoSkip: false,
                max: 4,
              },
            },
          ],
          yAxes: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Title</h2>
      <canvas ref={chartRef} width="500" height="200" />
    </div>
  );
};

export default HistogramGraph;