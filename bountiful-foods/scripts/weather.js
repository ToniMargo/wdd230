// Display current temperature and 3 day forecast from Carlsbad, CA. This function uses the OpenWeather API

const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');
const day3 = document.querySelector('#day3');
const temp1 = document.querySelector('#temp1');
const temp2 = document.querySelector('#temp2');
const temp3 = document.querySelector('#temp3');

const temperature = document.querySelector('#temperature');
const condition = document.querySelector('#condition');
const humidity = document.querySelector('#humidity');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=imperial&appid=d8b80212a11f7cffaca6a1ced52c249f';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.1580933&lon=-117.3505966&units=imperial&cnt=24&appid=d8b80212a11f7cffaca6a1ced52c249f';

async function apiFetch() {
    try {
      const response = await fetch(url);
      const forecastResponse = await fetch(forecastUrl);
      if (response.ok && forecastResponse.ok) {
        const data = await response.json();
        const forecastData = await forecastResponse.json();
        displayResults(data);
        displayForecast(forecastData);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  apiFetch();

function displayResults(weatherData) {
  temperature.innerHTML = `${weatherData.main.temp.toFixed(0)}°`;
  condition.textContent = weatherData.weather[0].description;
  humidity.innerHTML = `☔: ${weatherData.main.humidity}%`;     
}



function displayForecast(forecastData) {
  const day1minTemps = [];
  const day1maxTemps = [];

  const day2minTemps = [];
  const day2maxTemps = [];

  const day3minTemps = [];
  const day3maxTemps = [];

  for(let i=0; i<forecastData.list.length; i++){
    if (i>=0 && i<8) {
      day1minTemps.push(forecastData.list[i].main.temp_min);
      day1maxTemps.push(forecastData.list[i].main.temp_max);
    } else if (i>=8 && i<16) {
      day2minTemps.push(forecastData.list[i].main.temp_min);
      day2maxTemps.push(forecastData.list[i].main.temp_max);
    } else if (i>=16 && i<forecastData.list.length) {
      day3minTemps.push(forecastData.list[i].main.temp_min);
      day3maxTemps.push(forecastData.list[i].main.temp_max);
    }
  }
  const day1minTemp = Math.min(...day1minTemps).toFixed(0);
  const day1maxTemp = Math.max(...day1maxTemps).toFixed(0);

  const day2minTemp = Math.min(...day2minTemps).toFixed(0);
  const day2maxTemp = Math.max(...day2maxTemps).toFixed(0);

  const day3minTemp = Math.min(...day3minTemps).toFixed(0);
  const day3maxTemp = Math.max(...day3maxTemps).toFixed(0);

  // GET NUMBER OF DAY
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const d = new Date();
  const weekday1 = weekday[d.getDay() + 1];
  const weekday2 = weekday[d.getDay() + 2];
  const weekday3 = weekday[d.getDay() + 3];
  
  day1.textContent = weekday1;
  temp1.innerHTML = `${day1minTemp}°/${day1maxTemp}°`;

  day2.textContent = weekday2;
  temp2.innerHTML = `${day2minTemp}°/${day2maxTemp}°`;

  day3.textContent = weekday3;
  temp3.innerHTML = `${day3minTemp}°/${day3maxTemp}°`;
}