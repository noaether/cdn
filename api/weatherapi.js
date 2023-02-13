const fetch = require("node-fetch");
var SunCalc = require('suncalc');
const moment = require('moment-timezone');

exports.handler = async function (event, context) {
  let openweather;
  try {
    openweather = await fetch('https://api.openweathermap.org/data/2.5/weather?id=6077246&units=metric&appid=e5b292ae2f9dae5f29e11499c2d82ece');
    const openweather_res = await openweather.json();
    var times = SunCalc.getTimes(new Date(), 45.5001, -73.6825);
    let sunriseStr = moment.tz(times.sunrise, 'UTC').clone().tz('America/New_York').format('HH:mm');
    let sunsetStr = moment.tz(times.sunset, 'UTC').clone().tz('America/New_York').format('HH:mm');

    return {
      statusCode: 200,
      Headers : {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        main: openweather_res.main,
        description: openweather_res.weather[0].description,
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