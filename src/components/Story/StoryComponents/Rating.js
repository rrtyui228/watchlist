import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import s from '../Story.module.scss';
import {ChevronDown} from 'react-bootstrap-icons';
import {Score} from 'shared';

@inject(({StoryStore}) => {
  return {
    score: StoryStore.score,
    isExpanded: StoryStore.isExpanded,
    toggleIsExpanded: StoryStore.toggleIsExpanded
  };
})
@observer
class Rating extends React.Component {
  render() {
    const {score, isExpanded, toggleIsExpanded} = this.props;

    return (
      <div className={s.rating}>
        <Score score={score} />
        <div
          className={s.expand}
          onClick={toggleIsExpanded}
        >
          <ChevronDown
            className={isExpanded ? s.reversed : s.unReversed}
          />
        </div>
      </div>
    );
  }
}

Rating.propTypes = {
  score: PropTypes.number,
  isExpanded: PropTypes.bool,
  toggleIsExpanded: PropTypes.func
};

export default Rating;
