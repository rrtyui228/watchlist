import React from 'react';
import PropTypes from 'prop-types';
import s from './Story.module.scss';
import {inject, observer} from 'mobx-react';

@inject(({StoryStore}) => {
  return {
    title: StoryStore.title,
    description: StoryStore.description,
    isExpanded: StoryStore.isExpanded,
  };
})
@observer
class Source extends React.Component {
  render() {
    const {title, description, isExpanded} = this.props;

    return (
      <div className={s.info}>
        <div className={s.title}>
          {title}
        </div>
        {
          isExpanded && (
            <div className={s.description}>
              {description}
            </div>
          )
        }
      </div>
    );
  }
}

Source.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isExpanded: PropTypes.bool
};

export default Source;
