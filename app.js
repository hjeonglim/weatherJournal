/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event listener and create function called by event listener
document.querySelector("#generate").addEventListener("click", performAction);

function performAction(e) {
    e.preventDefault();

    const zip = document.querySelector("#zip").value;
    const feeling = document.querySelector("#feelings").value;
    
    getData(baseURL, zip, apiKey)
        .then(function(data) {
            postData('/addWeather', {temp: data.main.temp, feel: feeling, date: newDate})
        })
        .then(function() {
            updateUI();
        });
};

//Make a get request to the openweathermap api
const getData = async (url, zip, key) => {
    let apiURL = `${url}${zip},us&units=imperial&appid=${key}`;
    const response = await fetch(apiURL);
    try{
        const data = await response.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error", error);
    }
}
//Make a post request to the route
const postData = async (url='', data={}) => {
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return;
    } catch (error) {
        console.log("error", error);
    }
};

//update user interface
const updateUI = async() => {
    const response = await fetch('/all');
    try {
        const allData = await response.json();
        // console.log('ui', allData)
        document.querySelector('#date').innerHTML = `Date: ${allData.date}`;
        document.querySelector('#temp').innerHTML = `Temperature: ${allData.temp}`;
        document.querySelector('#content').innerHTML = `I feel: ${allData.feel}`;
    } catch (error) {
        console.log("error", error);
    }
}
