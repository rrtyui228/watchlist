import React from 'react';
import PropTypes from 'prop-types';
import s from '../Story.module.scss';
import {inject, observer} from 'mobx-react';
import Source from './Source';

@inject(({StoryStore}) => {
  return {
    title: StoryStore.title,
    description: StoryStore.description,
    isExpanded: StoryStore.isExpanded,
    sourceUrl: StoryStore.sourceUrl
  };
})
@observer
class Summary extends React.Component {
  render() {
    const {
      title,
      description,
      isExpanded,
      sourceUrl
    } = this.props;

    return (
      <div className={s.info}>
        <a
          href={sourceUrl}
          className={s.title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        {
          isExpanded && (
            <div className={s.description}>
              {description}
            </div>
          )
        }
        <Source />
      </div>
    );
  }
}

Summary.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isExpanded: PropTypes.bool,
  sourceUrl: PropTypes.string
};

export default Summary;
