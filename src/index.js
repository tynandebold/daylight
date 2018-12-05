import './scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

import Place from './js/Place';
import { locations } from './js/locations';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentDidMount() {
    const today = moment().format('MM-DD-YYYY');
    const setDate = localStorage.getItem('daylightDay');
    const hasData = moment().isSame(moment(setDate, 'MM-DD-YYYY'), 'day');    

    if (hasData) {
      this.setState({
        data: JSON.parse(localStorage.getItem('daylightData'))
      });
    } else {
      this.getAllData().then((data) => {
        localStorage.setItem('daylightData', JSON.stringify(data));
        localStorage.setItem('daylightDay', today);
        this.setState({ data });
      });
    }
  }

  getAllData() {
    return Promise.all(locations.map(this.fetchData));
  }

  fetchData = async (location) => {
    const latLong = location.coords;
    const response = await fetch(`https://api.darksky.net/forecast/b9c97c92e43e0065f6bddcaed31ec0df/${latLong}?exclude=[currently,minutely,hourly,flags`);
    const data = await response.json();

    const sunriseUnix = data.daily.data["0"].sunriseTime;
    const sunsetUnix = data.daily.data["0"].sunsetTime;
    const timeDiff = moment.duration(moment.unix(sunsetUnix).diff(moment.unix(sunriseUnix)));
    const timeDiffMins = (timeDiff._data.seconds >= 30) ? timeDiff._data.minutes + 1 : timeDiff._data.minutes;
    const daylightNum = moment.unix(sunsetUnix).diff(moment.unix(sunriseUnix), 'hours', true);

    return Object.assign({}, location, {
      daylight: `${timeDiff._data.hours} hours, ${timeDiffMins} minutes`,
      daylightNum,
      latLong,
      sunrise: moment.unix(sunriseUnix).tz(data.timezone).format('h:mma'),
      sunrise24: moment.unix(sunriseUnix).tz(data.timezone).format('HH:mm'),
      sunset: moment.unix(sunsetUnix).tz(data.timezone).format('h:mma'),
      sunset24: moment.unix(sunsetUnix).tz(data.timezone).format('HH:mm'),
      timezone: data.timezone
    });
  }

  render() {
    const places = this.state.data.map(item => {
      return <Place {...item} key={item.location} />
    });
    
    return (
      <React.Fragment>
        {places}
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);