const apis = (() => {
  const WEATHER_API_KEY = '28d6342177404f138c655735240102';

  async function getLocationWeather(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&days=1&q=${location}&aqi=no&alerts=no`);
    return response.json();
  }

  return {
    getLocationWeather,
  };
});

export default apis;
