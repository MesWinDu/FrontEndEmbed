import React, { useState, useEffect } from 'react';
import HistogramGraph from './HistogramGraph';
import axios from 'axios';
import Newgraph from './newgraph';
import Histogram from './Histogram';

const App = () => {
    const titles = ["TotalLate", "TotalAbsent", "PresentPeriod"];
    const [TotalLate, setTotalLate] = useState([]);
    const [totalParticipantstoday, setTotalParticipantstoday] = useState();
    const [totalParticipants, setTotalParticipants] = useState();
    const [TotalAbsent, setTotalAbsent] = useState([])
    const [PresentPeriod, setPresentPeriod] = useState([])
    const getTotalLate = (async()=>{
        const response = await axios.get('https://handy-word-production.up.railway.app/api/fetchdata')
        const data = {
            names : response.data.FirstName,
            total : response.data.Total
        }
        console.log(data)
        setTotalLate(data)
    })
    const getTotalAbsent = (async()=>{
        const response = await axios.get('https://handy-word-production.up.railway.app/api/fetchdataabsent')
        const data = {
            names : response.data.FirstName,
            total : response.data.Total
        }
        setTotalAbsent(data)
    })
    const getPresentPeriod = (async()=>{
        const response = await axios.get('https://handy-word-production.up.railway.app/api/fetchdatapresenint')
        const data = {
            time : response.data.FirstName,
            totalpresent : response.data.Total
        }
        setPresentPeriod(data)
    })
    const gettotalparticipants = (async()=>{
        const response = await axios.get('https://handy-word-production.up.railway.app/api/gettotalparticipants')
      
        setTotalParticipants(response.data.result)
    })
    const gettotalparticipantstoday = (async()=>{
        const response = await axios.get('https://handy-word-production.up.railway.app/api/fetchdatatotalparti')
        
        setTotalParticipantstoday(response.data.result)
    })
    const fetchalldata = (async()=>{
        await getTotalLate()
        await getTotalAbsent()
        await getPresentPeriod()
        await gettotalparticipants()
        await gettotalparticipantstoday()
    })
  useEffect(() => {
    fetchalldata()
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Participant details</h1>
      <div style={{ textAlign: 'center' }}>
        {/* {histogramData.map((data, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <HistogramGraph data={data} title={titles[index]} />
          </div>
        ))} */}
        <div style={{ marginBottom: '20px' }}>
            <Newgraph data={TotalLate} title={titles[0]} />
            <Newgraph data={TotalAbsent} title={titles[1]} />
            <Histogram data={PresentPeriod} title={titles[2]} />

          </div>
      </div>
      <p style={{ textAlign: 'center' }}>Total Participants Today: {totalParticipantstoday}</p>
      <p style={{ textAlign: 'center' }}>Total Participants: {totalParticipants}</p>
    </div>
  );
};

export default App;
