import React from 'react';

export default function ({ daylight, latLong, location, sunrise, sunset}) {
  return (
    <div className="location">
      <p>Location: {location} (<small>{latLong}</small>)</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <p>Daylight: {daylight}</p>
    </div>
  );
}