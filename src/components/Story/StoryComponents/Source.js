import React from 'react';
import PropTypes from 'prop-types';
import s from '../Story.module.scss';
import {inject, observer} from 'mobx-react';

@inject(({StoryStore}) => {
  return {
    thumb: StoryStore.thumb,
    sourceName: StoryStore.sourceName,
    publishDiffLabel: StoryStore.publishDiffLabel,
    sourceHost: StoryStore.sourceHost
  };
})
@observer
class Source extends React.Component {
  render() {
    const {
      thumb,
      sourceName,
      publishDiffLabel,
      sourceHost
    } = this.props;

    return (
      <div className={s.source}>
        <img src={thumb} alt={''} className={s.thumb} />
        <a
          href={sourceHost}
          className={s.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {sourceName}
        </a>
        <div className={s.publish}>
          {publishDiffLabel}
        </div>
      </div>
    );
  }
}

Source.propTypes = {
  thumb: PropTypes.string,
  sourceName: PropTypes.string,
  publishDiffLabel: PropTypes.string,
  sourceHost: PropTypes.string
};

export default Source;
