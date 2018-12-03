import React from 'react';
import moment from 'moment-timezone';

export default function ({ daylight, latLong, location, sunrise, sunrise24, sunset, sunset24 }) {
  const sunriseAsDec = moment.duration(sunrise24).asHours();
  const sunsetAsDec = moment.duration(sunset24).asHours();
  const sunriseCoord = (sunriseAsDec / 24) * 100;
  const sunsetCoord = (sunsetAsDec / 24) * 100;
  const sunsetLeft = `calc(${sunsetCoord}% - 8px)`;
  const sunsetRight = (100 - (sunsetAsDec / 24) * 100);
  const position = {
    left: `calc(${sunriseCoord}% + 7px)`,
    right: `calc(${sunsetRight}% - 1px)`
  };

  return (
    <div className="location">
      <p style={{ fontWeight: 700 }}>{location} (<small>{latLong}</small>)</p>
      <p>Daylight: {daylight}</p>
      <div className="viz-wrapper">
        <div className="marker" style={{ left: sunriseCoord + '%' }}></div>
        <div className="marker" style={{ left: sunsetLeft }}></div>
        <div className="line" style={position}></div>
        <div className="label" style={{ left: sunriseCoord + '%' }}>{sunrise}</div>
        <div className="label" style={{ left: sunsetLeft }}>{sunset}</div>
      </div>
    </div>
  );
}