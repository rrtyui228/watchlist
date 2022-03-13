import React from 'react';
import PropTypes from 'prop-types';
import s from './Story.module.scss';
import {inject, observer} from 'mobx-react';
import {Image, Rating, Summary, ExpandPanel} from './StoryComponents';

@inject(({StoryStore}) => {
  return {
    isExpanded: StoryStore.isExpanded
  };
})
@observer
class Story extends React.Component {
  render() {
    const {isExpanded} = this.props;

    return (
      <div className={s.expandedContainer}>
        <div className={s.container}>
          <Image/>
          <div className={s.content}>
            <Summary/>
            <Rating/>
          </div>
        </div>
        {
          isExpanded && (
            <ExpandPanel />
          )
        }
      </div>
    );
  }
}

Story.propTypes = {
  isExpanded: PropTypes.bool
};

export default Story;
