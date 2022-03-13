import React from 'react';
import PropTypes from 'prop-types';
import s from './Score.module.scss';
import cn from 'classnames';

class Score extends React.Component {
  render() {
    const {score} = this.props;

    return (
      <div className={cn(
        s.container,
        {
          [s.containerGreen]: score > 50,
          [s.containerYellow]: score <= 50 && score > 20,
          [s.containerRed]: score <= 20
        }
      )}>
        {`${score}%`}
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number
};

export default Score;
