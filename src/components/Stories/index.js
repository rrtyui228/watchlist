import React from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import Story from 'components/Story';
import {Loader} from 'shared';

@inject(({WatchlistStore}) => {
  return {
    stories: WatchlistStore.stories || [],
    loadingStatus: WatchlistStore.loadingStatus
  };
})
@observer
class Stories extends React.Component {
  render() {
    const {stories, loadingStatus} = this.props;

    return loadingStatus === 'loading' ? <Loader /> :
      stories.map((story) => (
        <Story key={story.id} story={story} />
      ));
  }
}

Stories.propTypes = {
  stories: PropTypes.array,
  loadingStatus: PropTypes.string
};

export default Stories;
