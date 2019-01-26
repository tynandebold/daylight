import React from 'react';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  componentDidMount() {
    const stopper = this.state.text + '...';
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: this.props.text }))
        : this.setState((prevState) => ({ text: prevState.text + '.' }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <h4>{this.state.text}</h4>
    )
  }
}