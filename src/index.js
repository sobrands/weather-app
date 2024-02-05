const WEATHER_API_KEY = '28d6342177404f138c655735240102';

async function getLocationWeather(location) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}&aqi=no`);
  return response.json();
}

getLocationWeather('london').then((response) => {
  console.log(response);
});
