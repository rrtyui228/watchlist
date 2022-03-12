import React from 'react';
import PropTypes from 'prop-types';
import s from './Story.module.scss';
import Image from './Image';
import Summary from './Summary';
import Rating from './Rating';

class Story extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Image />
        <div className={s.content}>
          <Summary />
          <Rating />
        </div>
      </div>
    );
  }
}

Story.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  score: PropTypes.number,
};

export default Story;
