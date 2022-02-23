export default function getWeather() {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=paris&appid=0385b2073dd106cd2ae5019621c6b1ba")
    .then((res)=> res.json())
    .then((res)=> console.log(res))
    .catch((err) => {
      console.log("Error while fetching the weather")
    });
}