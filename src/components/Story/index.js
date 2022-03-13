import React from 'react';
import StoryView from './StoryView';
import StoryStore from 'stores/Story';
import {Provider} from 'mobx-react';
import PropTypes from 'prop-types';

class Story extends React.Component {
  constructor(props) {
    super(props);

    const {story} = props;

    this.StoryStore = new StoryStore(story);
  }

  render() {
    return (
      <Provider StoryStore={this.StoryStore}>
        <StoryView />
      </Provider>
    );
  }
}

Story.propTypes = {
  story: PropTypes.object
};

export default Story;
