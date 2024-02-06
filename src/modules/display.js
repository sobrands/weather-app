import { format } from 'date-fns';
import API from './api';

const apiUser = API();
const defaultLocation = 'Singapore';

function displayCurrentWeather(data) {
  console.log(data);

  const currentWeatherCtn = document.getElementById('current-weather');

  const weatherIcon = document.createElement('img');
  weatherIcon.src = data.current.condition.icon;
  weatherIcon.classList.add('h-40', 'w-40');

  const weatherStatus = document.createElement('p');
  weatherStatus.textContent = data.current.condition.text;
  weatherStatus.classList.add('text-3xl', 'font-semibold');

  const location = document.createElement('p');
  location.textContent = data.location.name;

  const localtime = document.createElement('p');

  currentWeatherCtn.appendChild(weatherStatus);
  currentWeatherCtn.appendChild(location);
  currentWeatherCtn.appendChild(localtime);
  currentWeatherCtn.appendChild(weatherIcon);
}

function displayForecastWeather(data) {

}

export default function displayDefault() {
  apiUser.getLocationWeather(defaultLocation)
    .then((response) => {
      displayCurrentWeather(response);
      displayForecastWeather(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
