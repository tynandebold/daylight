import React from 'react';
import moment from 'moment-timezone';

export default function ({ daylight, latLong, location, sunrise, sunrise24, sunset, sunset24 }) {
  const sunriseAsDecimal = moment.duration(sunrise24).asHours();
  const sunsetAsDeciaml = moment.duration(sunset24).asHours();
  const sunriseCoord = (sunriseAsDecimal / 24) * 100;
  const sunsetCoord = (sunsetAsDeciaml / 24) * 100;
  const sunsetLeft = `calc(${sunsetCoord}% - 8px)`;
  const sunsetRight = (100 - (sunsetAsDeciaml / 24) * 100);
  const position = {
    left: `calc(${sunriseCoord}% + 7px)`,
    right: `calc(${sunsetRight}% - 1px)`
  };
  const latitude = latLong.split(',')[0];
  const longitude = latLong.split(',')[1].trim();

  return (
    <div className="location">
      <p className="location__name">{location}</p>
      <p>Daylight: {daylight}</p>
      <div className="location__viz viz">
        <div className="viz__marker" style={{ left: sunriseCoord + '%' }}></div>
        <div className="viz__marker" style={{ left: sunsetLeft }}></div>
        <div className="viz__line" style={position}></div>
        <div className="viz__label" style={{ left: sunriseCoord + '%' }}>{sunrise}</div>
        <div className="viz__label" style={{ left: sunsetLeft }}>{sunset}</div>
      </div>
      <div className="location__latLong">
        <p>Lat: <span>{latitude}</span></p>
        <p>Long: <span>{longitude}</span></p>
      </div>
    </div>
  );
}