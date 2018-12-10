import moment from 'moment-timezone';

export function shapeData(data, latLong, location) {
  const sunriseUnix = data.daily.data["0"].sunriseTime;
  const sunsetUnix = data.daily.data["0"].sunsetTime;
  const timeDiff = moment.duration(moment.unix(sunsetUnix).diff(moment.unix(sunriseUnix)));
  let timeDiffMins = (timeDiff._data.seconds >= 30) ? timeDiff._data.minutes + 1 : timeDiff._data.minutes;
  timeDiffMins = timeDiffMins < 10 ? `0${timeDiffMins}` : timeDiffMins;
  const daylightNum = moment.unix(sunsetUnix).diff(moment.unix(sunriseUnix), 'hours', true);

  return Object.assign({}, location, {
    daylightHrs: timeDiff._data.hours < 10 ? `0${timeDiff._data.hours}` : timeDiff._data.hours,
    daylightMin: timeDiffMins,
    daylightNum,
    latLong,
    sunrise: moment.unix(sunriseUnix).tz(data.timezone).format('h:mma'),
    sunrise24: moment.unix(sunriseUnix).tz(data.timezone).format('HH:mm'),
    sunset: moment.unix(sunsetUnix).tz(data.timezone).format('h:mma'),
    sunset24: moment.unix(sunsetUnix).tz(data.timezone).format('HH:mm'),
    timezone: data.timezone
  });
}