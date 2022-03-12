import React from 'react';
import PropTypes from 'prop-types';
import s from './Story.module.scss';
import {inject, observer} from 'mobx-react';

@inject(({StoryStore}) => {
  return {
    image: StoryStore.imageUrls?.[0]
  };
})
@observer
class Image extends React.Component {
  render() {
    const {image} = this.props;

    return (
      <img src={image} alt={''} className={s.image} />
    );
  }
}

Image.propTypes = {
  image: PropTypes.string
};

export default Image;
