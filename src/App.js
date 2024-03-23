import React, { useState, useEffect } from 'react';
import HistogramGraph from './HistogramGraph';
import axios from 'axios';

// const histogramData = [
//   {
//     labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
//     values: [10, 20, 15, 30]
//   },
//   {
//     labels: ['Category A', 'Category B', 'Category C', 'Category D'],
//     values: [5, 15, 25, 20]
//   }
// ];
// axios.get('https://main--benevolent-selkie-c0292b.netlify.app//fetchdata')
//   .then(response => {
//     console.log(response.data);
//     const histogramData = [
//       {labels:response.data.FirstName,
//       values:response.data.Total}
//     ]
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


const App = () => {
  const titles = ["TotalLate","TotalAbsent","PresentPeriod"]
  const [histogramData, setHistogramData] = useState([]);
  const [totalParticipantstoday, settotalParticipantstoday] = useState()
  const [totalParticipants, settotalParticipants] = useState()
  const data = [{}]
  useEffect(() => {
    axios.get('https://handy-word-production.up.railway.app/api/fetchdata')
      .then(response => {
        data[0] = {
          labels:response.data.FirstName,
          values:response.data.Total
        };
        console.log(data)
        setHistogramData(data); // Assuming response contains histogramData // Assuming response contains totalParticipants
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('https://handy-word-production.up.railway.app/api/fetchdataabsent')
      .then(response => {
        data[1] = {
          labels:response.data.FirstName,
          values:response.data.Total
        };
        console.log(data)
        setHistogramData(data); // Assuming response contains histogramData // Assuming response contains totalParticipants
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('https://handy-word-production.up.railway.app/api/fetchdatapresenint')
      .then(response => {
        data[2] = {
          labels:response.data.FirstName,
          values:response.data.Total
        };
        console.log(data)
        setHistogramData(data); // Assuming response contains histogramData // Assuming response contains totalParticipants
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('https://handy-word-production.up.railway.app/api/fetchdatatotalparti')
      .then(response => {
        settotalParticipantstoday(response.data.count); // Assuming response contains histogramData // Assuming response contains totalParticipants
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
      axios.get('https://handy-word-production.up.railway.app/api/gettotalparticipants')
      .then(response =>{
        settotalParticipants(response.data.count)
      })
      .catch(error =>{
        console.error('Error fetching data:', error);
      })
  }
  , []);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Participant detials</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {histogramData.map((data, index) => (
          <div key={index} style={{ width: '60%', minWidth: '400px' }}>
            <HistogramGraph data={data} title={titles[index]} />
          </div>
        ))}
      </div>
      <p style={{ textAlign: 'center' }}>Total Participants Today: {totalParticipantstoday}</p>
      <p style={{ textAlign: 'center' }}>Total Participants: {totalParticipants}</p>
    </div>
  );
}

export default App;
