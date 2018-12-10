import React from 'react';
import moment from 'moment-timezone';

export default function Place({ daylightHrs, daylightMin, latLong, location, sunrise, sunrise24, sunset, sunset24 }) {
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
  const noDaylight = daylightMin === '00' ? 'no-daylight' : '';  

  return (
    <div className='location'>
      <p className='location__name'>{location}</p>
      <div className='location__viz viz'>
        <div className={`viz__marker ${noDaylight}`} style={{ left: sunriseCoord + '%' }}></div>
        <div className={`viz__marker ${noDaylight}`} style={{ left: sunsetLeft }}></div>
        <div className={`viz__line ${noDaylight}`} style={position}>
          <div className='viz__daylight-wrapper'>
            <span>{daylightHrs} hrs</span>
            <span>{daylightMin} min</span>
          </div>
        </div>
        <div className={`viz__label ${noDaylight}`} style={{ left: sunriseCoord + '%' }}>{sunrise}</div>
        <div className={`viz__label ${noDaylight}`} style={{ left: sunsetLeft }}>{sunset}</div>
      </div>
      <div className={`location__latLong ${noDaylight}`}>
        <p>Lat: <span>{latitude}</span></p>
        <p>Long: <span>{longitude}</span></p>
      </div>
    </div>
  );
}