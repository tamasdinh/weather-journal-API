/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const key = '&APPID=';
const keyValue = 'b6c2e555f36966be6615e36144ea6610';
const localURL = 'http://localhost';
const port = 5001;

let d = new Date();
let month = d.getMonth() + 1;
let newDate = d.getDate() + '/' + month + '/' + d.getFullYear();


/* Functions */

// GET call to obtain weather data with user-provided zip code and country code
const getWeather = async (zip, country) => {
  const url = baseURL + '?zip=' + zip + ',' + country + key + keyValue;
  return await fetch(url).then(response => response.json()).then(response => response.main.temp);
}

// POST call to send user data from forms to own API server
const postUserData = async (localURL, port, postPayLoad) => {
  fetch(localURL + ':' + port + '/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postPayLoad)
  })
}

// GET call to obtain current project data object
const getCurrentData = async () => {
  return await fetch(localURL + ':' + port + '/get').then(response => response.json())
}

async function clickUpdate () {
  const country = document.getElementById('country').value;
  const zip = document.getElementById('zip').value;
  
  const userResponse = document.getElementById('feelings').value;
  const temperature = await getWeather(zip, country);

  const postPayLoad = {temperature, date: newDate, userResponse};
  await postUserData(localURL, port, postPayLoad);
  
  await getCurrentData()
  .then((response) => {
    document.getElementById('date').innerHTML = response.date,
    document.getElementById('temp').innerHTML = response.temperature,
    document.getElementById('content').innerHTML = response.userResponse
  });
  
}
 

/* Execution */

// Adding click EventListener to "Generate" button in HTML

document.getElementById('generate').addEventListener('click', clickUpdate)
