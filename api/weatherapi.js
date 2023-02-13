const fetch = require("node-fetch");
var SunCalc = require('suncalc');

exports.handler = async function (event, context) {
  let openweather;
  let sun;
  try {
    openweather = await fetch('https://api.openweathermap.org/data/2.5/weather?id=6077246&units=metric&appid=e5b292ae2f9dae5f29e11499c2d82ece');
    const openweather_res = await openweather.json();
    var times = SunCalc.getTimes(new Date(), 45.5001, -73.6825);
    var sunriseStr = times.sunrise.getHours() + ':' + (times.sunrise.getMinutes() < 10 ? '0' + times.sunrise.getMinutes() : times.sunrise.getMinutes());
    var sunsetStr = times.sunset.getHours() + ':' + (times.sunset.getMinutes() < 10 ? '0' + times.sunset.getMinutes() : times.sunset.getMinutes())
    return {
      statusCode: 200,
      body: JSON.stringify({
        temp: openweather_res.main.temp,
        feels_like: openweather_res.main.feels_like,
        wind: openweather_res.wind.speed,
        winddeg: openweather_res.wind.deg,
        sunrise: sunriseStr,
        sunset: sunsetStr,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed fetching data',
        openweather: openweather.status,
      }),
    };
  }

}
exports.module = {
  name: 'weatherapi',
  params: [' '],
  example: 'weatherapi'
}