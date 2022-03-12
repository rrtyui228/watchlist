import React from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import Story from '../Story';

@inject(({WatchlistStore}) => {
  return {
    stories: WatchlistStore.stories || [],
  };
})
@observer
class Stories extends React.Component {
  render() {
    return this.props.stories.map((story) => (
      <Story key={story.id} story={story} />
    ));
  }
}

Stories.propTypes = {
  stories: PropTypes.array,
};

export default Stories;
