import './scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

import Place from './js/Place';
import Loading from './js/Loading';
import TitleCard from './js/TitleCard';
import { shapeData } from './js/shapeData';
import { locations } from './js/locations';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: false,
      loaded: false
    };
  }

  componentDidMount() {
    const today = moment().format('MM-DD-YYYY');
    const setDate = localStorage.getItem('daylightDay');
    const setData = JSON.parse(localStorage.getItem('daylightData'));
    const hasDate = moment().isSame(moment(setDate, 'MM-DD-YYYY'), 'day');
    const hasData = setData != null;

    if (hasDate && hasData) {
      this.setState({
        data: JSON.parse(localStorage.getItem('daylightData')),
        loaded: true
      });
    } else {
      Promise.all(locations.map(this.fetchData))
        .then(data => {
          localStorage.setItem('daylightData', JSON.stringify(data));
          localStorage.setItem('daylightDay', today);
          this.setState({
            data,
            loaded: true
          });
        })
        .catch(err => {
          this.setState({
            error: err
          });
        });
    }
  }

  fetchData = async location => {
    const latLong = location.coords;
    const exclude = 'currently,minutely,hourly,flags';
    const response = await fetch(
      `https://dark-sky-proxy-j3a39gjn2.now.sh/api/v1/weather?latLong=${latLong}&exclude=${exclude}`,
      {
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        mode: 'cors'
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return shapeData(data, latLong, location);
  };

  render() {
    const locations = this.state.data.map(item => {
      return <Place {...item} key={item.location} />;
    });

    return (
      <React.Fragment>
        <div className="title-card-wrapper">
          <TitleCard />
          {this.state.error && (
            <p>An error occurred. Please try again later.</p>
          )}
          {!this.state.loaded && (
            <Loading interval="400" text="Fetching latest data" />
          )}
        </div>
        <div className="locations">{locations}</div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
