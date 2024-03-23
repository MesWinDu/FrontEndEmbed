import React, { useState, useEffect } from 'react';
import HistogramGraph from './HistogramGraph';
import axios from 'axios';

const App = () => {
  const titles = ["TotalLate", "TotalAbsent", "PresentPeriod"];
  const [histogramData, setHistogramData] = useState([]);
  const [totalParticipantstoday, setTotalParticipantstoday] = useState();
  const [totalParticipants, setTotalParticipants] = useState();
  const data = [{}, {}, {}]; // Initialize data array with empty objects

  useEffect(() => {
    const fetchDataFromBackend = async (url, dataIndex) => {
      try {
        const response = await axios.get(url);
        data[dataIndex] = {
          labels: response.data.FirstName,
          values: response.data.Total
        };
        setHistogramData([...data]); // Update histogramData with new data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataWithTimeout = async (url, dataIndex, timeout) => {
      try {
        await Promise.race([
          fetchDataFromBackend(url, dataIndex),
          new Promise((resolve) => setTimeout(resolve, timeout))
        ]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch data from backend with timeout
    fetchDataWithTimeout('https://handy-word-production.up.railway.app/api/fetchdata', 0, 10000);
    fetchDataWithTimeout('https://handy-word-production.up.railway.app/api/fetchdataabsent', 1, 10000);
    fetchDataWithTimeout('https://handy-word-production.up.railway.app/api/fetchdatapresenint', 2, 10000);

    // Fetch total participants today
    axios.get('https://handy-word-production.up.railway.app/api/fetchdatatotalparti')
      .then(response => {
        setTotalParticipantstoday(response.data.result); // Set total participants today
      })
      .catch(error => {
        console.error('Error fetching total participants today:', error);
      });

    // Fetch total participants
    axios.get('https://handy-word-production.up.railway.app/api/gettotalparticipants')
      .then(response => {
        setTotalParticipants(response.data.result); // Set total participants
      })
      .catch(error => {
        console.error('Error fetching total participants:', error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Participant details</h1>
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
};

export default App;
