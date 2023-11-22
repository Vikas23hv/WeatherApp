document.addEventListener('DOMContentLoaded', function () {
  const weatherForm = document.getElementById('weatherForm');
  weatherForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const cityInput = document.getElementById('cityInput');
      getWeatherForecast(cityInput.value);
  });
});

function getWeatherForecast(city) {
  const apiKey = 'f6a317254b12c6484c2dbd9f44decc01';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const weatherInfo = document.getElementById('weather-info');
          weatherInfo.innerHTML = ''; // Clear previous content

          for (let i = 0; i < data.list.length && i < 7; i++) {
              const forecastData = data.list[i];
              const date = new Date(forecastData.dt * 1000);
              const temperature = Math.round(forecastData.main.temp - 273.15);
              const description = forecastData.weather[0].description;

              const forecastItem = document.createElement('div');
              forecastItem.classList.add('col-md-6', 'col-lg-3', 'forecast-item'); // Use Bootstrap grid classes
              forecastItem.innerHTML = `<p>Date: ${date.toDateString()}</p><p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;
              
              weatherInfo.appendChild(forecastItem);
          }
      })
      .catch(error => {
          console.error('Error fetching weather forecast data:', error);
          const weatherInfo = document.getElementById('weather-info');
          weatherInfo.innerHTML = '<p>Error fetching weather forecast data. Please try again.</p>';
      });
}




