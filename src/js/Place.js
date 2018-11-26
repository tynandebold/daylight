import React from 'react';

export default function ({ daylight, location, sunrise, sunset}) {
  return (
    <div className="location">
      <p>Location: {location}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      <p>Daylight: {daylight}</p>
    </div>
  );
}