import React, { useState, useEffect } from 'react';

const Loading = props => {
  const [text, setText] = useState(props.text);
  let interval;

  useEffect(() => {
    const stopper = props.text + '...';
    interval = window.setInterval(() => {
      text === stopper
        ? setText(props.text)
        : setText(prevText => prevText + '.');
    }, props.interval);

    return function cleanup() {
      window.clearInterval(interval);
    };
  });

  return <h4>{text}</h4>;
};

export default Loading;
