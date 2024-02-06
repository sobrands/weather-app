const apis = (() => {
  const WEATHER_API_KEY = '28d6342177404f138c655735240102';

  async function getLocationWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&days=8&q=${location}&aqi=no&alerts=no`);
    if (!response.ok) {
      return Promise.reject(response.json());
    }
    return response.json();
  }

  return {
    getLocationWeather,
  };
});

export default apis;
