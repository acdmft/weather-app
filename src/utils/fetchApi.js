const api_key = process.env.REACT_APP_WEATHER_API_KEY;
export const fetchApi = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
  ).then((res) => res.json());
};