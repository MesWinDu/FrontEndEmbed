// const axios = require("axios");

// let respond;

// axios.get('http://localhost:3000/fetchdata')
//   .then(response => {
//     respond = response.data;
//     console.log(respond);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

// const data = [{}]
// data[0] = {asdasd:"sadads",asdsad:"dasd"}
// data[1] = {asdasd:"sadads",asdsad:"dasd"}
// console.log(data)

const today = new Date();
const dateOnly = today.toISOString().slice(0, 10); // Extracts characters from index 0 to 10 (yyyy-mm-dd)
console.log(dateOnly);

