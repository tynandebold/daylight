import React from 'react';
import moment from 'moment-timezone';

export default function ({ daylight, latLong, location, sunrise, sunrise24, sunset, sunset24 }) {
  const sunriseAsDec = moment.duration(sunrise24).asHours();
  const sunsetAsDec = moment.duration(sunset24).asHours();
  const sunriseCoord = (sunriseAsDec / 24) * 100;
  const sunsetCoord = (sunsetAsDec / 24) * 100;

  console.log(sunset);
  

  return (
    <div className="location">
      <p>Location: {location} (<small>{latLong}</small>)</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <p>Daylight: {daylight}</p>
      <div className="viz-wrapper">
        <div className="marker" style={{ left: sunriseCoord + '%' }}></div>
        <div className="marker" style={{ left: sunsetCoord + '%' }}></div>
      </div>
    </div>
  );
}