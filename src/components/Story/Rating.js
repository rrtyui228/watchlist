import React from 'react';
import PropTypes from 'prop-types';
import s from './Story.module.scss';
import Score from '../Score';
import {ChevronDown} from 'react-bootstrap-icons';
import cn from 'classnames';
import {inject, observer} from 'mobx-react';

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
        <div className={s.expand} onClick={toggleIsExpanded}>
          <ChevronDown
            className={cn({[s.reversed]: isExpanded})}
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
