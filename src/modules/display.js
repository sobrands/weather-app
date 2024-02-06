import { format } from 'date-fns';
import API from './api';
import thermometerImage from '../assets/thermometer.png';
import humidityImage from '../assets/humidity.png';
import visiblilityImage from '../assets/visibility.png';
import windImage from '../assets/wind.png';

const apiUser = API();
const defaultLocation = 'Singapore';

function displayCurrentWeather(data) {
  const currentWeatherCtn = document.getElementById('current-weather');
  currentWeatherCtn.textContent = '';

  const weatherIcon = document.createElement('img');
  weatherIcon.src = data.current.condition.icon;
  weatherIcon.classList.add('h-40', 'w-40');

  const weatherStatus = document.createElement('p');
  weatherStatus.textContent = data.current.condition.text;
  weatherStatus.classList.add('text-3xl', 'font-semibold');

  const location = document.createElement('p');
  location.textContent = data.location.name;
  location.classList.add('text-2xl');

  const localtime = document.createElement('p');
  localtime.textContent = format(data.current.last_updated, 'PPP');

  const currentTemp = document.createElement('p');
  currentTemp.textContent = `${data.current.temp_c} \u00B0C`;
  currentTemp.classList.add('text-3xl');

  currentWeatherCtn.appendChild(location);
  currentWeatherCtn.appendChild(localtime);
  currentWeatherCtn.appendChild(currentTemp);
  currentWeatherCtn.appendChild(weatherStatus);
  currentWeatherCtn.appendChild(weatherIcon);
}

function displayWeatherDetails(data) {
  const weatherDetailsCtn = document.getElementById('details');
  weatherDetailsCtn.textContent = '';

  const feelsLike = document.createElement('div');
  const feelsLikeImg = document.createElement('img');
  const feelsLikeText = document.createElement('p');
  const feelsLikeTemp = document.createElement('p');

  feelsLikeImg.src = thermometerImage;
  feelsLikeImg.classList.add('h-10', 'w-10', 'row-span-2', 'self-center');

  feelsLikeText.textContent = 'Feels Like';
  feelsLikeText.classList.add('row-span-1', 'col-span-2', 'text-xs');

  feelsLikeTemp.textContent = `${data.current.feelslike_c} \u00B0C`;
  feelsLikeTemp.classList.add('col-span-2', 'text-2xl');

  feelsLike.classList.add('grid', 'grid-rows-[auto_1fr]', 'grid-cols-[auto,1fr,1fr]');
  feelsLike.appendChild(feelsLikeImg);
  feelsLike.appendChild(feelsLikeText);
  feelsLike.appendChild(feelsLikeTemp);

  const humidity = document.createElement('div');
  const humidityImg = document.createElement('img');
  const humidityText = document.createElement('p');
  const humidityVal = document.createElement('p');

  humidityImg.src = humidityImage;
  humidityImg.classList.add('h-8', 'w-8', 'mx-2', 'row-span-2', 'self-center');

  humidityText.textContent = 'Humidity';
  humidityText.classList.add('row-span-1', 'col-span-2', 'text-xs');

  humidityVal.textContent = `${data.current.humidity} %`;
  humidityVal.classList.add('col-span-2', 'text-2xl');

  humidity.classList.add('grid', 'grid-rows-[auto_1fr]', 'grid-cols-[auto,1fr,1fr]');
  humidity.appendChild(humidityImg);
  humidity.appendChild(humidityText);
  humidity.appendChild(humidityVal);

  const visibility = document.createElement('div');
  const visibilityImg = document.createElement('img');
  const visibilityText = document.createElement('p');
  const visibilityVal = document.createElement('p');

  visibilityImg.src = visiblilityImage;
  visibilityImg.classList.add('h-10', 'w-10', 'mx-3', 'row-span-2', 'self-center');

  visibilityText.textContent = 'Visibility';
  visibilityText.classList.add('row-span-1', 'col-span-2', 'text-xs');

  visibilityVal.textContent = `${data.current.vis_km} KM`;
  visibilityVal.classList.add('col-span-2', 'text-2xl');

  visibility.classList.add('grid', 'grid-rows-[auto_1fr]', 'grid-cols-[auto,1fr,1fr]');
  visibility.appendChild(visibilityImg);
  visibility.appendChild(visibilityText);
  visibility.appendChild(visibilityVal);

  const windSpeed = document.createElement('div');
  const windSpeedImg = document.createElement('img');
  const windSpeedText = document.createElement('p');
  const windSpeedVal = document.createElement('p');

  windSpeedImg.src = windImage;
  windSpeedImg.classList.add('h-10', 'w-10', 'mx-3', 'row-span-2', 'self-center');

  windSpeedText.textContent = 'Wind Speed';
  windSpeedText.classList.add('row-span-1', 'col-span-2', 'text-xs');

  windSpeedVal.textContent = `${data.current.wind_kph} KM/H`;
  windSpeedVal.classList.add('col-span-2', 'text-2xl');

  windSpeed.classList.add('grid', 'grid-rows-[auto_1fr]', 'grid-cols-[auto,1fr,1fr]');
  windSpeed.appendChild(windSpeedImg);
  windSpeed.appendChild(windSpeedText);
  windSpeed.appendChild(windSpeedVal);

  weatherDetailsCtn.appendChild(feelsLike);
  weatherDetailsCtn.appendChild(humidity);
  weatherDetailsCtn.appendChild(visibility);
  weatherDetailsCtn.appendChild(windSpeed);
}

function renderDayInfo(data, ctn) {
  const dayData = document.createElement('div');
  const day = document.createElement('p');
  const maxTemp = document.createElement('p');
  const avgTemp = document.createElement('p');
  const condition = document.createElement('img');

  day.textContent = `${format(data.date, 'EEEE')}`;

  maxTemp.textContent = `${data.day.maxtemp_c} \u00B0C`;
  maxTemp.classList.add('text-xl', 'font-medium');

  avgTemp.textContent = `${data.day.avgtemp_c} \u00B0C`;
  avgTemp.classList.add('text-xs');

  condition.src = data.day.condition.icon;
  condition.classList.add('h-12', 'w-12');

  dayData.classList.add('flex', 'flex-col', 'gap-1', 'align-center', 'justify-start');
  dayData.appendChild(day);
  dayData.appendChild(maxTemp);
  dayData.appendChild(avgTemp);
  dayData.appendChild(condition);

  ctn.appendChild(dayData);
}

function displayForecastWeather(data) {
  const forecastDays = data.forecast.forecastday;
  const forecastCtn = document.getElementById('forecast');
  forecastCtn.textContent = '';

  for (let i = 1; i < forecastDays.length; i++) {
    renderDayInfo(forecastDays[i], forecastCtn);
  }
}

function displayWeather(data) {
  displayCurrentWeather(data);
  displayWeatherDetails(data);
  displayForecastWeather(data);
}

export default function displayDefault() {
  apiUser.getLocationWeather(defaultLocation)
    .then((response) => {
      displayWeather(response);
    })
    .catch((err) => {
      console.error(err);
    });

  const button = document.querySelector('button');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const inputLocation = document.querySelector('input');
    inputLocation.blur();
    if (inputLocation.value === '') return;

    apiUser.getLocationWeather(inputLocation.value)
      .then((response) => {
        inputLocation.value = '';
        displayWeather(response);
      })
      .catch((err) => {
        err.then((msg) => {
          inputLocation.value = '';
          const errMsg = document.querySelector('span');
          errMsg.textContent = msg.error.message;
          errMsg.style.display = 'block';
        });
      });
  });

  const inputLocation = document.querySelector('input');
  inputLocation.addEventListener('input', (e) => {
    const errMsg = document.querySelector('span');
    errMsg.textContent = '';
    errMsg.style.display = 'none';
  });
}
