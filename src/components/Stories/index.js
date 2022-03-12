import React from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import Story from '../Story';
import s from './Stories.module.scss';

@inject(({WatchlistStore}) => {
  return {
    stories: WatchlistStore.stories || [],
  };
})
@observer
class Stories extends React.Component {
  render() {
    const {stories} = this.props;

    return (
      <div className={s.stories}>
        {
          stories.map((story) => (
            <Story key={story.id} story={story} />
          ))
        }
      </div>
    );
  }
}

Stories.propTypes = {
  stories: PropTypes.array,
};

export default Stories;
