const fetch = require("node-fetch");

exports.handler=async function(event, context) {

  try {
    const openweather = await fetch('https://api.openweathermap.org/data/2.5/weather?id=6077246&units=metric&appid=e5b292ae2f9dae5f29e11499c2d82ece');
    const openweather_res = await openweather.json();
    const sun = await fetch('https://api.sunrisesunset.io/json?lat=45.5001&lng=--73.6825&timezone=EST&date=today');
    const sun_res = await sun.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        temp: openweather_res.main.temp,
        feels_like: openweather_res.main.feels_like,
        wind: openweather_res.wind.speed,
        winddeg: openweather_res.wind.deg,
        sunrise: sun_res.results.sunrise,
        sunset: sun_res.results.sunset,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }

}
exports.module = {
  name: 'weatherapi',
  params: [' '],
  example: 'weatherapi'
}