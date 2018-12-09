import './scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

import Place from './js/Place';
import { shapeData } from './js/shapeData'
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
        .then((data) => {
          localStorage.setItem('daylightData', JSON.stringify(data));
          localStorage.setItem('daylightDay', today);
          this.setState({
            data,
            loaded: true
          });
        })
        .catch(err => {
          this.setState({
            error: JSON.parse(err.message)
          });
        });
    }
  }

  fetchData = async (location) => {
    const latLong = location.coords;
    const response = await fetch(`https://api.darksky.net/forecast/b9c97c92e43e0065f6bddcaed31ec0df/${latLong}?exclude=[currently,minutely,hourly,flags`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return shapeData(data, latLong, location);
  }

  render() {
    const places = this.state.data.map(item => {
      return <Place {...item} key={item.location} />
    });
    
    return (
      <React.Fragment>
        {places}
        {this.state.error && <p>An error occured (code {this.state.error.code}). {this.state.error.error} Please try again later.</p>}
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);